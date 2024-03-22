import { browser } from "$app/environment";
import { readable } from "svelte/store";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

const getInitialMotionPreference = () =>
	browser ? window.matchMedia(reducedMotionQuery).matches : false;

export const reducedMotion = readable(getInitialMotionPreference(), (set) => {
	const updateMotionPreference = (event) => {
		set(event.matches);
	};

	let queryList = browser ? window.matchMedia(reducedMotionQuery) : null;

	function initialize() {
		queryList?.addEventListener("change", updateMotionPreference);
		updateMotionPreference(window.matchMedia(reducedMotionQuery));
	}

	if (browser) {
		initialize();
	}

	return () => {
		queryList?.removeEventListener("change", updateMotionPreference);
	};
});
