import { DataSource } from "typeorm";
import { Friendship, SuyuUser } from "../schema";

export const db = new DataSource({
	type: "better-sqlite3",
	database: "db.sqlite",
	entities: [SuyuUser, Friendship],
	synchronize: true,
	subscribers: [],
	migrations: [],
});
