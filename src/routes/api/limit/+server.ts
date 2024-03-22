import { RateLimiter, json } from "$lib/server/util/index.js";

export function POST({ request, getClientAddress }) {
	return json({
		success: true,
	});
}
