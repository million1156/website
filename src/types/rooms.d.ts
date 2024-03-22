import type { SwitchGame } from "$lib/server/other";
import type { SuyuUser } from "$lib/server/schema";

export interface IRoom {
	address: string;
	description: string;
	externalGuid: string;
	hasPassword: boolean;
	id: string;
	maxPlayers: number;
	name: string;
	netVersion: number;
	owner: string;
	players: RoomPlayer[];
	port: number;
	preferredGameId: number;
	preferredGameName: string;
	game?: SwitchGame;
}

export interface IRoomConfig {
	name: string;
	description: string;
	gameName: string;
	gameId: number;
	hasPassword: boolean;
	players: RoomPlayer[];
	maxPlayers: number;
	ip: string;
	port: number;
	host: SuyuUser;
}

export interface RoomPlayer {
	gameId: number;
	gameName: string;
	nickname: string;
}

export interface LobbyResponse {
	rooms: IRoom[];
}
