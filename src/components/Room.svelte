<script lang="ts">
	import type { IRoom } from "$types/rooms";

	export let room: IRoom;
</script>

<div
	class="relative flex h-full w-full overflow-hidden rounded-[2.25rem] border-2 border-solid border-[#ffffff34] bg-[#110d10] p-6 shadow-lg shadow-[#00000028]"
>
	<div
		class="absolute left-0 top-0 z-20 h-full w-full opacity-25 blur-sm"
		style="background-image: url({room.game
			?.bannerUrl}); background-size: cover; background-position: center center;
			--mask-image: linear-gradient(
				to right,
				rgba(0, 0, 0, 0.1) 50%,
				rgba(0, 0, 0, 1) 100%
			); mask-image: var(--mask-image); -webkit-mask-image: var(--mask-image);
			"
	/>
	<div class="relative z-30 flex min-h-[0] min-w-[0] items-center gap-6">
		{#if room.game?.iconUrl}
			<img
				src={room.game.iconUrl}
				alt="Icon for '{room.preferredGameName}'"
				class="flex aspect-square max-h-[84px] max-w-[84px] shrink-0 rounded-2xl object-cover md:max-h-[148px] md:max-w-[148px]"
			/>
		{/if}
		<div class="flex h-full w-full flex-col overflow-hidden">
			<div class="flex items-center">
				<h2
					class="mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-[20px] leading-[1.41] md:text-[28px] md:leading-[1.1]"
				>
					{room.name}
				</h2>
				<span
					class="mb-[6px] ml-2 overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal text-gray-300"
					>({room.game?.name || "No preferred game"})</span
				>
			</div>
			<p class="flex-grow">{room.description}</p>
			<div class="mt-2 text-sm text-gray-300">
				{room.players.length} / {room.maxPlayers} | {#if room.players.length > 4}
					{#each room.players.slice(0, 4) as player}
						{player.nickname}{#if player !== room.players[3]},{" "}
						{/if}
					{/each}
					and {room.players.length - 4}
					{room.players.length - 4 === 1 ? "other" : "others"}
				{:else}
					{#each room.players as player}
						{player.nickname}{#if player !== room.players[room.players.length - 1]},{" "}
						{/if}
					{/each}
				{/if} | {room.hasPassword ? "Private" : "Public"} | {room.address}:{room.port}
			</div>
		</div>
	</div>
</div>
