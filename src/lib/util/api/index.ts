import { userRepo } from "$lib/server/repo";
import type { SuyuUser } from "$lib/server/schema";
import { PUBLIC_KEY } from "$lib/server/secrets/secrets.json";
import type { IJwtData } from "$types/auth";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export async function useAuth(
	request: Request | string,
	eager?: boolean,
): Promise<SuyuUser | null> {
	const cookies = cookie.parse(
		typeof request !== "string" ? request.headers.get("cookie") || "" : "",
	);
	const apiKey = typeof request === "string" ? request : cookies.token;
	if (!apiKey) {
		return null;
	}
	if (apiKey.startsWith("Bearer ")) {
		const token = apiKey.replace("Bearer ", "");
		const decoded: IJwtData = jwt.verify(token, Buffer.from(PUBLIC_KEY), {
			algorithms: ["RS256"],
		}) as IJwtData;
		const user = await userRepo.findOne({
			where: {
				apiKey: decoded.apiKey,
			},
			loadEagerRelations: eager || false,
			relations: eager ? ["sentFriendRequests", "receivedFriendRequests"] : [],
		});
		return user;
	}
	const user = await userRepo.findOne({
		where: {
			apiKey,
		},
		loadEagerRelations: eager || false,
		relations: eager ? ["sentFriendRequests", "receivedFriendRequests"] : [],
	});
	return user;
}

export async function useModeratorAuth(request: Request | string): Promise<{
	user: SuyuUser;
	isModerator: boolean;
} | null> {
	const user = await useAuth(request);
	if (!user) {
		return null;
	}
	return {
		user,
		isModerator: user.roles.includes("moderator"),
	};
}
