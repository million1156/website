<!-- <script lang="ts">
	import { SuyuAPI } from "$lib/client/api";
	import type { GetNotificationsResponseSuccess } from "$types/api";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { dev } from "$app/environment";
	import UserDisplay from "$components/UserDisplay.svelte";
	import { fly } from "svelte/transition";

	let input = "";
	let relationships: GetNotificationsResponseSuccess["notifications"] = [];

	async function sendFq() {
		const res = await SuyuAPI.friendship.sendFriendRequest({
			to: input,
		});
		if (!res.success) return alert(res.error);
		await refresh();
	}

	async function refresh() {
		const res = await SuyuAPI.friendship.getRelationships();
		if (!res.success) return alert(res.error);
		relationships = res.friendships || [];
	}

	async function deleteRelationship(
		relationship: GetNotificationsResponseSuccess["notifications"][0],
	) {
		const res = await SuyuAPI.friendship.deleteRelationship({
			id: relationship.id,
		});
		if (!res.success) return alert(res.error);
		await refresh();
	}

	async function acceptFq(relationship: GetNotificationsResponseSuccess["notifications"][0]) {
		const res = await SuyuAPI.friendship.sendFriendRequest({
			to: relationship.from?.username,
		});
		if (!res.success) return alert(res.error);
		await refresh();
	}

	onMount(() => {
		refresh();
		const interval = setInterval(refresh, dev ? 500 : 30000);
		return () => clearInterval(interval);
	});

	export let data: PageData;
</script>

<div class="relative h-[calc(100vh-200px)] flex-col gap-6 overflow-hidden">
	<div
		class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
	>
		<h2 class=" text-[36px] leading-[1.41] md:text-[48px] md:leading-[1.1]">Friends</h2>
		<p class="text-md text-wrap leading-relaxed text-gray-400">
			As of right now, friends are just a way to keep track of who you know. In the future, we
			will add more features to this, such as inviting to rooms.
		</p>
		<div class="input-container text-md flex gap-4 text-wrap leading-relaxed">
			<input class="input !w-[250px]" placeholder="Username" type="text" bind:value={input} />
			<div class="flex gap-4">
				<button on:click={sendFq} class="cta-button">Send</button>
				<button on:click={refresh} class="button-sm">Refresh</button>
			</div>
		</div>
		<div class="relationship-grid">
			{#each relationships as relationship}
				<div
					in:fly|global={{ duration: 360 }}
					out:fly|global={{
						duration: 360,
					}}
				>
					<UserDisplay
						sent={relationship.to.id !== data.user.id}
						accepted={relationship.accepted}
						user={relationship.to.id === data.user.id
							? relationship.from
							: relationship.to}
						on:delete={() => deleteRelationship(relationship)}
						on:accept={() => acceptFq(relationship)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.relationship-grid {
		grid-template-columns: repeat(5, 1fr);
		display: grid;
		gap: 8px;
	}

	@media (max-width: 1000px) {
		.relationship-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 650px) {
		.relationship-grid {
			grid-template-columns: 2fr;
		}
	}

	@media (max-width: 600px) {
		.input-container {
			flex-direction: column;
		}
	}
</style> -->
