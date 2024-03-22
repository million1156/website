import { RoomManager } from "$lib/server/class/Room.js";

export function load({ request }) {
	const rooms = RoomManager.getRooms().map((r) => r.toJSON()) || [];
	return {
		rooms: rooms,
	};
}
