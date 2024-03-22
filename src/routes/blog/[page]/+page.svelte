<script lang="ts">
	import CodeRenderer from "$components/CodeRenderer.svelte";
	import type { PageData } from "./$types";
	import SvelteMarkdown from "svelte-markdown";

	export let data: PageData;
</script>

<div class="page">
	<article class="prose prose-invert mx-auto px-4 lg:prose-xl">
		<header>
			<address class="mb-4 text-lg text-gray-400">{data.props.author} presents...</address>
		</header>
		<SvelteMarkdown
			source={data.props.contents}
			renderers={{
				code: CodeRenderer,
			}}
		/>
	</article>
</div>
