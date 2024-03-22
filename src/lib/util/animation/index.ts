interface Animation {
	duration: number;
	delay: number;
	property: string | string[];
	timingFunction: string;
}

export const transition =
	"linear(0,0.006,0.025 2.8%,0.101 6.1%,0.539 18.9%,0.721 25.3%,0.849 31.5%,0.937 38.1%,0.968 41.8%,0.991 45.7%,1.006 50.1%,1.015 55%,1.017 63.9%,1.001)";

export function generateTransition(animations: Animation[]) {
	return animations
		.map((animation) =>
			Array.isArray(animation.property)
				? animation.property
						.map(
							(property) =>
								`${property} ${animation.duration}ms ${animation.timingFunction} ${animation.delay * 50}ms`,
						)
						.join(", ")
				: `${animation.property} ${animation.duration}ms ${animation.timingFunction} ${animation.delay * 50}ms`,
		)
		.join(", ");
}
