<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import CodeRenderer from "$components/CodeRenderer.svelte";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	let content = "";

	const handleOnSubmit = (event: Event) => {
		event.preventDefault();
		console.log(content);
	};

	export let data: PageData;

	onMount(() => {
		if (!data.userInfo.isModerator) goto("/blog");
	});
</script>

<div class="flex h-[calc(100vh-196px)] min-h-[32rem] w-full flex-row gap-8">
	<div class="flex h-full w-1/2 flex-1 flex-col gap-4">
		<form on:submit={handleOnSubmit} class="contents">
			<div class="flex flex-row items-center justify-between">
				<h1>Write</h1>
				<button type="submit" class="cta-button">Publish</button>
			</div>
			<textarea
				id="write"
				bind:value={content}
				class="h-full w-full resize-none rounded-2xl !border-none bg-[#110d10] p-4 font-[Consolas] !outline-none ring ring-[#ffffff11] focus:ring-[#ffffff44]"
			></textarea>
		</form>
	</div>

	<div class="flex h-full w-1/2 flex-1 flex-col gap-4">
		<div class="flex flex-row items-center justify-between">
			<h1>Preview</h1>
			<div class="h-12"></div>
		</div>
		<div
			class="prose prose-invert h-full w-full overflow-auto rounded-2xl bg-zinc-950 p-4 ring ring-[#ffffff11] focus:ring-[#ffffff44]"
		>
			<SvelteMarkdown
				renderers={{
					code: CodeRenderer,
				}}
				source={content}
			/>
		</div>
	</div>
</div>
