<script lang="ts">
	import { onMount, tick } from "svelte";

	export let items: { name: string; value: string }[] = [];
	export let selected: (typeof items)[0] = items[0];
	let selectedIndex = 0;
	$: selected = items[selectedIndex];
	let expanded = false;
	let navItems: HTMLUListElement;

	function recalculatePos() {
		const { right } = navItems.getBoundingClientRect();
		console.log(right, window.innerWidth);
		if (right > window.innerWidth) {
			navItems.style.left = `${window.innerWidth - right - 36}px`;
		} else {
			navItems.style.left = "0";
		}
	}

	async function toggle() {
		expanded = !expanded;
		await tick();
		// do we have enough space to the right of the navItems?
		recalculatePos();
	}

	onMount(() => {
		function close(e: MouseEvent | UIEvent) {
			if ("clientX" in e) {
				// check if we're clicking outside the dropdown
				if (
					e.target instanceof HTMLElement &&
					!e.target.classList.contains("dropdown") &&
					!e.target.closest(".dropdown")
				) {
					expanded = false;
				}
			} else {
				expanded = false;
			}
		}

		window.addEventListener("mousedown", close);
		window.addEventListener("resize", close);
		return () => {
			window.removeEventListener("click", close);
			window.removeEventListener("resize", close);
		};
	});
</script>

<div class="relative flex">
	<button
		class="flex w-full items-center justify-between rounded-2xl bg-zinc-950 p-2 ring ring-[#ffffff11] focus:ring-[#ffffff44]"
		aria-haspopup="listbox"
		aria-expanded={expanded}
		on:click={toggle}
		type="button"
	>
		<span class="ml-1 mr-4">{selected.name}</span>
		<svg
			class="h-4 w-4"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</button>
	<ul
		bind:this={navItems}
		class="absolute {expanded
			? 'block'
			: 'hidden'} top-full z-[9999] mt-2 max-h-[50vh] w-fit overflow-y-auto overflow-x-hidden rounded-2xl bg-zinc-950 ring ring-[#ffffff11] focus:ring-[#ffffff44]"
		role="listbox"
		aria-hidden="true"
	>
		{#each items as item, i}
			<button
				role="option"
				aria-selected={selectedIndex === i}
				on:click={() => {
					selectedIndex = i;
					toggle();
				}}
				class="w-full cursor-pointer whitespace-nowrap px-4 py-3 text-left hover:bg-zinc-900"
			>
				{item.name}
			</button>
		{/each}
	</ul>
</div>

<style>
	[aria-expanded="true"] > svg {
		transform: rotate(180deg);
	}
</style>
