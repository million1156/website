import { RoomManager } from "$lib/server/class/Room";
import { json } from "$lib/server/util/index.js";
import { useAuth } from "$lib/util/api/index.js";

/* thanks again janeberru for the shape of this data */
export async function POST({ request, params }) {
	const body = await request.json();
	const { id } = params;
	const room = RoomManager.getRoom(id);
	if (!room) return new Response(null, { status: 500 });
	const user = await useAuth(request.headers.get("authorization") || "");
	if (!user) return new Response(null, { status: 401 });
	if (user.id !== room.host.id) return new Response(null, { status: 401 });
	if (body.players.length === 0 && room.roomInfo.owner) {
		console.log(room.roomInfo.players);
		room.setPlayerList([{ gameId: 0, gameName: "", nickname: room.roomInfo.owner }]);
	}
	return json({ message: "Lobby updated successfully" });
}

export async function DELETE({ request, params }) {
	const { id } = params;
	const room = RoomManager.getRoom(id);
	if (!room) return new Response(null, { status: 500 });
	const user = await useAuth(request.headers.get("authorization") || "");
	if (!user) return new Response(null, { status: 401 });
	if (user.id !== room.host.id) return new Response(null, { status: 401 });
	room.delete();
	return json(room.toJSON());
}
