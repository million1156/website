<script lang="ts">
	import type { SuyuUser } from "$lib/server/schema";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher<{
		delete: {};
		accept: {};
	}>();
	export let user: SuyuUser;
	export let accepted: boolean;
	export let sent: boolean;
</script>

<!-- <div
	class="flex items-center gap-2 rounded-[16px] border-2 border-solid border-[#ffffff34] p-1 py-1"
>
	<img
		src="{user.avatarUrl}&s=24"
		alt="{user.username}'s profile picture"
		width="24"
		height="24"
		class="ml-1 rounded-full"
	/>
	<p class="min-w-0 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
		{user.username}
	</p>
	{#if !accepted && !sent}
		<button class="button-sm h-8" on:click={() => dispatch("accept", {})}>Accept</button>
	{/if}
	<button class="button-sm h-8" on:click={() => dispatch("delete", {})}
		>{sent ? (accepted ? "Delete" : "Cancel") : "Delete"}</button
	>
</div> -->

<div
	class="flex aspect-[1/1.5] w-full flex-col overflow-hidden rounded-3xl border-2 border-solid border-[#ffffff34] shadow-2xl shadow-black"
>
	<div class="flex flex-grow items-center justify-center">
		<img
			src="{user.avatarUrl}&s=220"
			alt="{user.username}'s profile picture"
			class="h-full w-full object-cover"
		/>
	</div>
	<div
		class="flex h-[33%] w-full flex-shrink-0 flex-col border-t-2 border-t-[#ffffff34] px-3 py-2"
	>
		<h3 class="flex-grow text-center text-xl">{user.username}</h3>
		<div class="mb-[4px] flex justify-around">
			{#if !accepted && !sent}
				<button class="button-sm" on:click={() => dispatch("accept", {})}>Accept</button>
			{/if}
			<button class="button-sm" on:click={() => dispatch("delete", {})}
				>{sent ? (accepted ? "Delete" : "Cancel") : "Delete"}</button
			>
		</div>
	</div>
</div>
