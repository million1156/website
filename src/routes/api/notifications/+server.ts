// import { json } from "$lib/server/util/index.js";
// import { useAuth } from "$lib/util/api/index.js";
// import type { GetNotificationsResponse } from "$types/api";

// export async function GET({ request }) {
// 	const user = await useAuth(request);
// 	if (!user)
// 		return json<GetNotificationsResponse>({
// 			success: false,
// 			error: "Not logged in",
// 		});
// 	const requests = await user.getFriendRequests();
// 	console.log(requests);
// 	return json<GetNotificationsResponse>({
// 		success: true,
// 		notifications: requests,
// 	});
// }
