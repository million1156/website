import path from "path";
import fs from "fs/promises";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const basePath = "static/blog";
	const page = params.page;
	// const contents = await fs.readFile(filePath, "utf-8");
	const files = await fs.readdir(basePath);
	const searchableFiles = files.map((f) =>
		f.split("-").slice(1).join("-").split(".md").slice(0, -1).join(".md"),
	);

	const index = searchableFiles.indexOf(page);
	const filename = files.at(index);
	if (!filename || index === -1) {
		error(404, "Not found");
	}

	const filePath = path.join(basePath, filename);
	const contents = await fs.readFile(filePath, "utf-8");

	return {
		props: {
			contents,
			author: filename.split("-")[0],
		},
	};
}
