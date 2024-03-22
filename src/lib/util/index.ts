import hashes from "$assets/blurhash.json";

export function getBlurHash(name: string): string {
	for (const key in hashes) {
		let modifiedKey = key;
		modifiedKey = key.split("\\").at(-1)!;
		const lastCapitalIndex = modifiedKey.search(/([^ \n])([A-Z][^A-Z]*$)/gm);
		modifiedKey = modifiedKey.slice(0, lastCapitalIndex + 1);
		if (modifiedKey === name) {
			return hashes[key];
		}
	}
	return "";
}
