<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import HCaptcha from "$components/HCaptcha.svelte";
	import { PUBLIC_SITE_KEY } from "$env/static/public";
	import { SuyuAPI } from "$lib/client/api";
	import type { PageData } from "./$types";
	import type { Writable } from "svelte/store";
	import { getContext, onMount } from "svelte";

	const token = getContext<Writable<string>>("token");
	if ($token) goto("/account");

	let usernameInput = "";
	let emailInput = "";
	let passwordInput = "";
	let captchaToken = "";
	$: disabled = !usernameInput || !emailInput || !captchaToken || !passwordInput;

	export let data: PageData;

	if (Object.keys(data.user).length !== 0 && browser) goto("/account");

	async function signUp() {
		const res = await SuyuAPI.users.createAccount({
			username: usernameInput,
			email: emailInput,
			captchaToken,
			password: passwordInput,
		});
		if (!res.success) {
			// TODO: modal
			alert(res.error);
			return;
		}
		// set "token" cookie
		document.cookie = `token=${res.token}; path=/; max-age=31536000; samesite=strict`;
		$token = res.token;
		goto("/account");
	}

	async function captchaComplete(event: CustomEvent<any>) {
		captchaToken = event.detail.token;
	}

	let shouldLoadCaptcha = false;

	onMount(() => {
		setTimeout(() => {
			shouldLoadCaptcha = true;
		}, 500);
	});
</script>

<div
	class="align-center relative flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-6"
>
	<div class="flex h-fit w-full max-w-[500px] flex-col rounded-[2.25rem] bg-[#110d10] p-10">
		<h1 class="text-[48px] md:text-[60px] md:leading-[1.1]">Sign up</h1>
		<div class="mt-4 flex flex-col gap-4">
			<p class="useless-text">Accounts are used for:</p>
			<ul class="list [&>*]:before:mr-3 [&>*]:before:content-['•']">
				<li>Creating rooms</li>
				<li>Adding friends</li>
			</ul>
			<form
				class="contents"
				on:submit={(e) => {
					e.preventDefault();
					signUp();
				}}
			>
				<input
					bind:value={emailInput}
					maxlength="128"
					class="input"
					type="text"
					placeholder="Email"
					autocomplete="email"
				/>
				<input
					bind:value={usernameInput}
					maxlength="24"
					class="input"
					type="text"
					autocomplete="off"
					placeholder="Username"
				/>
				<input
					bind:value={passwordInput}
					class="input"
					type="password"
					placeholder="Password"
					autocomplete="new-password"
				/>
				<div class="h-[78px]">
					{#if shouldLoadCaptcha}
						<HCaptcha
							on:success={captchaComplete}
							theme="dark"
							sitekey={PUBLIC_SITE_KEY}
						/>
					{/if}
				</div>
				<button {disabled} type="submit" on:click={signUp} class="cta-button mt-2"
					>Sign up</button
				>
			</form>
		</div>
	</div>
</div>

<style>
	.useless-text,
	.list {
		display: none;
	}

	@media (min-height: 850px) {
		.useless-text,
		.list {
			display: block;
		}
	}
</style>
