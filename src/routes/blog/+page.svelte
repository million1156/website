<!-- <script lang="ts">
	import { page } from "$app/stores";
	import { onDestroy, onMount } from "svelte";
	import type { PageData } from "./$types";
	import { transition } from "$lib/util/animation";
	import SvelteMarkdown from "svelte-markdown";
	import { goto } from "$app/navigation";
	import { reducedMotion } from "$lib/accessibility";

	let cardsContainer: HTMLDivElement;

	export function transitionIn() {
		// const cardWidth = 285;
		// const cardGap = 24;
		const bounds = cardsContainer.getBoundingClientRect();
		const cards = cardsContainer.querySelectorAll("div");
		// how many cards fit on a row
		// const cardsPerRow = Math.floor(bounds.width / (cardWidth + cardGap));
		cards.forEach((card, i) => {
			// const x = Math.floor(i / cardsPerRow);
			const x = i;
			card.style.zIndex = ((i + 1) * 5).toString();
			card.animate(
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
							delay: x * 40,
							fill: "forwards",
						},
			);
		});
	}

	onMount(() => {
		transitionIn();
	});

	export let data: PageData;
</script>

<h1 class="mb-8 text-[40px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Blog Posts</h1>
{#if data.userInfo.isModerator}
	<div class="mb-4 ml-1 flex gap-4">
		<a href="/blog/new" class="cta-button">Create a new post</a>
		<a href="/blog/edit" class="cta-button">Edit a post</a>
	</div>
{/if} 

<div class="grid max-w-full grid-cols-1 gap-8 lg:grid-cols-2" bind:this={cardsContainer}>
	{#each data.posts as post}
		<a href={`/blog/${post.slug}`}>
			<div
				class="card relative h-[250px] w-full translate-y-[-200px] overflow-hidden rounded-[2.25rem] border-2 border-solid border-zinc-700 bg-[#110d10] p-8 opacity-0 blur-[20px] lg:h-[400px]"
			>
				<div
					style="--mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,0) 100%); mask-image: var(--mask-image); -webkit-mask-image: var(--mask-image);"
					class="h-full"
				>
					<h1 class="mb-4 text-[24px] leading-[1.41] md:text-[36px] md:leading-[1.1]">
						{post.title}
					</h1>
					<p class="excerpt">
						<SvelteMarkdown source={post.contents} />
					</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.excerpt :global(*) {
		font-family: "DM Sans", sans-serif;
		font-size: 1rem;
	}

	.excerpt :global(h1),
	.excerpt :global(h2),
	.excerpt :global(h3),
	.excerpt :global(h4),
	.excerpt :global(h5),
	.excerpt :global(h6) {
		font-family: "DM Sans", sans-serif;
		font-weight: 500;
	}
</style> -->
