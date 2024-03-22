<script lang="ts">
	import prism from "prismjs";
	import "prismjs/components/prism-json";
	import "prismjs/components/prism-bash";
	import "prismjs/components/prism-css";
	import "prismjs/components/prism-csv";
	import "prismjs/components/prism-git";
	import "prismjs/components/prism-javascript";
	import "prismjs/components/prism-jsx";
	import "prismjs/components/prism-markdown";
	import "prismjs/components/prism-powershell";
	import "prismjs/components/prism-scss";
	import "prismjs/components/prism-typescript";
	import "prism-themes/themes/prism-vsc-dark-plus.min.css";
	import { CodeSnippet } from "carbon-components-svelte";

	export let lang: string;
	export let text: string;
	let formatted = "";

	$: if (prism.languages[lang]) {
		formatted = prism.highlight(text, prism.languages[lang], lang);
	}
</script>

<code
	class="block whitespace-pre rounded-xl bg-zinc-900 p-4 font-normal *:font-[Consolas] before:content-none after:content-none"
	>{@html formatted.trim()}
</code>
