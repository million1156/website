// import { friendshipRepo, userRepo } from "$lib/server/repo";
// import { json } from "$lib/server/util/index.js";
// import { useAuth } from "$lib/util/api/index.js";
// import type {
// 	GetRelationshipsResponse,
// 	DeleteAccountResponse,
// 	DeleteRelationshipRequest,
// 	DeleteRelationshipResponse,
// 	SendFriendRequestRequest,
// } from "$types/api.js";

// export async function POST({ request }) {
// 	const body: SendFriendRequestRequest = await request.json();
// 	const user = await useAuth(request, true);
// 	if (!user)
// 		return json({
// 			success: false,
// 			error: "Not logged in",
// 		});
// 	const to = await userRepo.findOne({
// 		where: {
// 			username: body.to,
// 		},
// 	});
// 	if (!to)
// 		return json({
// 			success: false,
// 			error: "User not found",
// 		});
// 	if (to.id === user.id)
// 		return json({
// 			success: false,
// 			error: "Cannot send friend request to self",
// 		});
// 	if (user.sentFriendRequests.some((frq) => frq.to.id === to.id))
// 		return json({
// 			success: false,
// 			error: "Friend request already sent",
// 		});
// 	const foundFrq = await friendshipRepo.findOne({
// 		where: {
// 			to: {
// 				id: user.id,
// 			},
// 			from: {
// 				id: to.id,
// 			},
// 		},
// 	});
// 	if (foundFrq) {
// 		foundFrq.accepted = true;
// 		await friendshipRepo.save(foundFrq);
// 		return json({
// 			success: true,
// 		});
// 	}
// 	const frq = friendshipRepo.create({
// 		to,
// 		from: user,
// 		accepted: false,
// 	});
// 	await friendshipRepo.save(frq);
// 	return json({
// 		success: true,
// 	});
// }

// export async function DELETE({ request }) {
// 	const body: DeleteRelationshipRequest = await request.json();
// 	const user = await useAuth(request, true);
// 	if (!user)
// 		return json<DeleteRelationshipResponse>(
// 			{
// 				success: false,
// 				error: "Not logged in",
// 			},
// 			401,
// 		);
// 	const relationship = await friendshipRepo.findOne({
// 		where: {
// 			id: body.id,
// 		},
// 		relations: ["to", "from"],
// 	});
// 	if (!relationship)
// 		return json<DeleteRelationshipResponse>(
// 			{
// 				success: false,
// 				error: "Relationship not found",
// 			},
// 			404,
// 		);
// 	if (relationship.to.id !== user.id && relationship.from.id !== user.id)
// 		return json<DeleteRelationshipResponse>(
// 			{
// 				success: false,
// 				error: "Not authorized",
// 			},
// 			403,
// 		);
// 	await friendshipRepo.remove(relationship);
// 	return json<DeleteRelationshipResponse>({
// 		success: true,
// 		friendships: user.sentFriendRequests.concat(user.receivedFriendRequests),
// 	});
// }

// export async function GET({ request }) {
// 	const auth = await useAuth(request, true);
// 	if (!auth) {
// 		return json<GetRelationshipsResponse>(
// 			{
// 				success: false,
// 				error: "Not logged in",
// 			},
// 			401,
// 		);
// 	}

// 	const user = await userRepo.findOne({
// 		where: {
// 			id: auth.id,
// 		},
// 		relations: [
// 			"sentFriendRequests",
// 			"sentFriendRequests.from",
// 			"sentFriendRequests.to",
// 			"receivedFriendRequests",
// 			"receivedFriendRequests.from",
// 			"receivedFriendRequests.to",
// 		],
// 		loadEagerRelations: true,
// 	});

// 	if (!user) {
// 		return json<GetRelationshipsResponse>(
// 			{
// 				success: false,
// 				error: "you don't exist?",
// 			},
// 			404,
// 		);
// 	}

// 	return json<GetRelationshipsResponse>({
// 		success: true,
// 		friendships: user.sentFriendRequests.concat(user.receivedFriendRequests),
// 	});
// }
