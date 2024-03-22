<script lang="ts">
	import Room from "$components/Room.svelte";
	import { reducedMotion } from "$lib/accessibility";
	import { transition } from "$lib/util/animation";
	import { onMount, tick } from "svelte";
	import type { PageData } from "./$types";
	import Dropdown from "$components/Dropdown.svelte";
	import { browser } from "$app/environment";

	export let data: PageData;

	function transitionIn() {
		const rooms = document.querySelectorAll<HTMLDivElement>(".room");
		rooms.forEach((room, i) => {
			const x = parseInt(room.dataset.index!);
			room.getAnimations().forEach((animation) => animation.cancel());
			room.style.zIndex = ((i + 1) * 5).toString();
			room.animate(
				[
					{
						transform: "translateY(-200px)",
						opacity: "0",
						filter: "blur(20px)",
					},
					{
						transform: "translateY(0px)",
						opacity: "1",
						filter: "blur(0px)",
					},
				],
				$reducedMotion
					? {
							duration: 0,
							fill: "forwards",
						}
					: {
							duration: 700,
							easing: transition,
							delay: x * 80,
							fill: "forwards",
						},
			).onfinish = () => {
				room.style.opacity = "1";
			};
		});
	}

	onMount(() => {
		transitionIn();
	});

	let filter: {
		name: string;
		value: string;
	} = { name: "", value: "" };

	let extendedContainer: HTMLDivElement;

	$: gamesFilters = [
		{
			name: "All",
			value: "",
		},
		...data.rooms
			.map((room) => room.game)
			.filter((game) => typeof game !== "undefined" && Boolean(game))
			.map((game) => ({
				name: game!.name,
				value: game!.name,
			}))
			.filter((game, i, arr) => arr.findIndex((g) => g.value === game.value) === i),
	];
	$: {
		if (browser) {
			filter;
			(async () => {
				await tick(); // wait for dom update :333
				transitionIn();
			})();
		}
	}

	onMount(() => {
		if (extendedContainer.style.opacity === "1") return;
		extendedContainer.animate(
			[
				{
					opacity: "0",
				},
				{
					opacity: "1",
				},
			],
			$reducedMotion
				? {
						duration: 0,
						fill: "forwards",
					}
				: {
						duration: 400,
						easing: transition,
						fill: "forwards",
						delay: 150,
					},
		);
	});

	$: rooms =
		filter.value !== "" ? data.rooms.filter((r) => r.game?.name === filter.value) : data.rooms;
</script>

<div
	bind:this={extendedContainer}
	class="pointer-events-none absolute -top-[60px] left-[50%] z-[999] flex h-11 w-full translate-x-[-50%] items-center opacity-0"
>
	<div class="dropdown pointer-events-auto">
		<Dropdown items={gamesFilters} bind:selected={filter} />
	</div>
</div>

<div class="relative h-[calc(100vh-200px)]">
	{#if rooms.length > 0}
		<div class="room-grid relative flex w-full gap-4 pb-6">
			{#each rooms as room, i}
				<div class="room min-h-0 min-w-0 overflow-hidden opacity-0" data-index={i}>
					<Room {room} />
				</div>
			{/each}
		</div>
	{:else}
		<i class="mt-4 block w-full text-center text-gray-500">
			{filter.value ? "No rooms matched your filter" : "No rooms are currently open"}...
		</i>
	{/if}
</div>

<style>
	.room-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-auto-rows: auto;
		align-items: stretch;
		min-width: 0;
		min-height: 0;
	}

	@media (min-width: 750px) {
		.room-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.dropdown {
			margin-left: 0 !important;
			margin-right: 0 !important;
		}
	}

	.dropdown {
		margin-left: auto;
		margin-right: 0;
	}
</style>
