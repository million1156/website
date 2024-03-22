/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
	],

	theme: {
		extend: {},
	},

	plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
