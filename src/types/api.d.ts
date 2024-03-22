/* api types */

import type { Friendship, SuyuUser } from "$lib/server/schema";

export interface GenericFailureResponse {
	success: false;
	error: string;
}

export interface CreateAccountRequest {
	username: string;
	email: string;
	captchaToken: string;
	password: string;
}

export interface CreateAccountResponseSuccess {
	success: true;
	user: SuyuUser;
	token: string;
}
export type CreateAccountResponse = CreateAccountResponseSuccess | GenericFailureResponse;

export interface DeleteAccountResponseSuccess {
	success: true;
}

export type DeleteAccountResponse = DeleteAccountResponseSuccess | GenericFailureResponse;

export interface GetUserResponseSuccess {
	success: true;
	user: SuyuUser;
}

export type GetUserResponse = GetUserResponseSuccess | GenericFailureResponse;

export interface LoginRequest {
	email: string;
	password: string;
	captchaToken: string;
}

export interface LoginResponseSuccess {
	success: true;
	token: string;
}

export type LoginResponse = LoginResponseSuccess | GenericFailureResponse;

export interface GetNotificationsResponseSuccess {
	success: true;
	notifications: Friendship[];
}

export type GetNotificationsResponse = GetNotificationsResponseSuccess | GenericFailureResponse;

export interface SendFriendRequestRequest {
	to: string;
}

export interface SendFriendRequestResponseSuccess {
	success: true;
}

export type SendFriendRequestResponse = SendFriendRequestResponseSuccess | GenericFailureResponse;

export interface DeleteRelationshipRequest {
	id: string;
}

export interface DeleteRelationshipResponseSuccess {
	success: true;
	friendships: Friendship[];
}

export type DeleteRelationshipResponse = DeleteRelationshipResponseSuccess | GenericFailureResponse;

export interface GetRelationshipsResponseSuccess {
	success: true;
	friendships: Friendship[];
}

export type GetRelationshipsResponse = GetRelationshipsResponseSuccess | GenericFailureResponse;
