import { db } from "../db";
import { Friendship, SuyuUser } from "../schema";

export const userRepo = db.getRepository(SuyuUser);
export const friendshipRepo = db.getRepository(Friendship);
