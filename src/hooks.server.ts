import { db } from "$lib/server/db";
import "reflect-metadata";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { WebSocketServer } from "ws";
import { userRepo } from "$lib/server/repo";
import { globalData } from "$lib/server/other";
import type { Assets } from "./routes/api/webhooks/release/+server";
import { RoomManager } from "$lib/server/class/Room";

let server: WebSocketServer;

function initServer() {
	try {
		server = new WebSocketServer({
			port: 21563,
			path: "/net",
		});
		server.on("error", (err) => {});
		server.on("connection", (socket) => {
			socket.on("message", (data) => {
				socket.send(data);
			});
		});
	} catch {}
}

async function fetchGames() {
	console.log("Fetching game data");
	const res = await fetch("https://raw.githubusercontent.com/blawar/titledb/master/US.en.json");
	let gamesText = await res.text();
	gamesText = gamesText.replaceAll(/\\u[0-9a-fA-F]{4}/gm, "");
	globalData.games = Object.values(JSON.parse(gamesText));
	console.log("Fetched game data");
}

async function setupGames() {
	await fetchGames();
	setInterval(fetchGames, 1000 * 60 * 60 * 12);
	setInterval(RoomManager.checkTimeouts, 1000);
}

const runAllTheInitFunctions = async () => {
	if (!db.isInitialized) await db.initialize();
	// if (!server)
	// 	try {
	// 		initServer();
	// 	} catch {
	// 		console.error("Could not initialize WebSocket server");
	// 	}
	if (globalData.games.length === 0) {
		await setupGames();
	}
};

if (!building) {
	await runAllTheInitFunctions();
}
