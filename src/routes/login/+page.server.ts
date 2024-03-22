import { RoomManager } from "$lib/server/class/Room.js";
import { useAuth } from "$lib/util/api";

export async function load(opts) {
	const apiKey = opts.cookies.get("token");
	const user = await useAuth(apiKey || "unused");

	return {
		user: { ...user },
		token: apiKey,
	};
}
