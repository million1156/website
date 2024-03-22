import { useAuth } from "$lib/util/api/index.js";

export async function load({ cookies, url }) {
	const token = cookies.get("token");
	const user = await useAuth(token || "");
	return {
		tokenCookie: token,
		url: url.pathname,
		user: { ...user },
	};
}
