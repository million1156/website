<script lang="ts">
	import { transition } from "$lib/util/animation";
	import type { GetUserResponseSuccess } from "$types/api";
	import { getContext, onMount } from "svelte";
	import type { Writable } from "svelte/store";
	import type { PageData } from "../routes/$types";
	import cookie from "cookiejs";

	interface AnchorItem {
		type: "anchor";
		name: string;
		href: string;
	}

	interface ButtonItem {
		type: "button";
		name: string;
		action: () => void;
	}

	interface DividerItem {
		type: "divider";
	}

	type NavItem = AnchorItem | ButtonItem | DividerItem;

	export let navItems: NavItem[] = [
		{ type: "anchor", name: "Multiplayer", href: "/account" },
		{
			type: "anchor",
			name: "Profile",
			href: "https://gravatar.com/profile",
		},
		{
			type: "divider",
		},
		{
			type: "button",
			name: "Sign out",
			action: signOut,
		},
	];

	export let user: PageData["user"];
	const token = getContext<Writable<string>>("token");

	let open = false;

	function signOut() {
		setTimeout(() => {
			$token = "";
			cookie.remove("token");
		}, 330); // 360ms is transition duration, 330ms
		//          is to prevent GC on chromium. :3c
		//          hi evan i know ur reading thisss
	}

	function toggleMenu() {
		open = !open;
	}

	let jsEnabled = false;

	onMount(() => {
		jsEnabled = true;
		function closeMenu(e: MouseEvent) {
			if (e.target instanceof HTMLElement) {
				if (!e.target.closest(".user-profile-menu")) {
					open = false;
				}
			}
		}
		window.addEventListener("mousedown", closeMenu);
		return () => window.removeEventListener("mousedown", closeMenu);
	});
</script>

<button class="user-profile-menu relative ml-3" on:click={toggleMenu}>
	<img
		style="transition: 240ms transform {transition}"
		src={`${user.avatarUrl}`}
		alt="{user.username}'s avatar"
		class="h-6 w-6 rounded-full"
	/>
	<div
		style="transition: 360ms {transition}"
		class={`${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"} absolute right-0 top-full mt-2 flex h-fit origin-top-right transform-gpu flex-col overflow-hidden rounded-[20px] rounded-tr-none border-2 border-solid border-[#ffffff34] bg-[#110d10] p-[2px] opacity-0 shadow-lg shadow-[rgba(0,0,0,0.25)] motion-reduce:transition-none [&>.nav-btn:first-child]:rounded-tl-[16px] [&>.nav-btn:first-child]:rounded-tr-none [&>.nav-btn:last-child]:rounded-bl-[16px] [&>.nav-btn:last-child]:rounded-br-[16px]`}
	>
		{#if jsEnabled}
			<!-- <div
				role="button"
				class="nav-btn flex items-center whitespace-nowrap hover:bg-[#1d1d1d] [&>*]:w-full [&>*]:px-4 [&>*]:py-2 [&>*]:text-left"
			>
				<a href="/account">Multiplayer</a>
			</div>
			<div
				role="button"
				class="nav-btn flex items-center whitespace-nowrap hover:bg-[#1d1d1d] [&>*]:w-full [&>*]:px-4 [&>*]:py-2 [&>*]:text-left"
			></div>
			<div
				role="separator"
				class="-ml-[2px] mb-[2px] mt-[2px] h-[2px] w-[calc(100%+4px)] bg-[#423e41]"
			/>
			<div
				role="button"
				class="nav-btn flex items-center whitespace-nowrap hover:bg-[#1d1d1d] [&>*]:w-full [&>*]:px-4 [&>*]:py-2 [&>*]:text-left"
			>
				<button on:click={signOut}>Sign out</button>
			</div> -->
			{#each navItems as navItem}
				{#if navItem.type === "divider"}
					<div
						role="separator"
						class="-ml-[2px] mb-[2px] mt-[2px] h-[2px] w-[calc(100%+4px)] bg-[#423e41]"
					/>
				{:else}
					<div
						role="button"
						class="nav-btn flex items-center whitespace-nowrap hover:bg-[#1d1d1d] [&>*]:w-full [&>*]:px-4 [&>*]:py-2 [&>*]:text-left"
					>
						{#if navItem.type === "anchor"}
							<a href={navItem.href}>{navItem.name}</a>
						{:else}
							<button on:click={navItem.action}>{navItem.name}</button>
						{/if}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</button>

<style>
	.user-profile-menu > img:hover {
		transform: scale(1.17) rotate(7deg);
	}

	.user-profile-menu > img:active {
		transform: scale(0.85) rotate(0deg);
	}
</style>
