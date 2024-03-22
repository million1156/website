import type {
	CreateAccountRequest,
	CreateAccountResponse,
	DeleteRelationshipRequest,
	DeleteRelationshipResponse,
	GetNotificationsResponse,
	GetRelationshipsResponse,
	GetUserResponse,
	LoginRequest,
	LoginResponse,
	SendFriendRequestRequest,
	SendFriendRequestResponse,
} from "$types/api";

const apiUsers = {
	async createAccount(body: CreateAccountRequest): Promise<CreateAccountResponse> {
		return await SuyuAPI.req("POST", "/api/user", body);
	},

	async login(body: LoginRequest): Promise<LoginResponse> {
		return await SuyuAPI.req("POST", "/api/user/login", body);
	},

	async deleteAccount() {
		return await SuyuAPI.req("DELETE", "/api/user");
	},

	async getUser(): Promise<GetUserResponse> {
		return await SuyuAPI.req("GET", "/api/user");
	},
} as const;

const apiNotifications = {
	async getNotifications(): Promise<GetNotificationsResponse> {
		return await SuyuAPI.req("GET", "/api/notifications");
	},
} as const;

const apiFriendship = {
	async sendFriendRequest(body: SendFriendRequestRequest): Promise<SendFriendRequestResponse> {
		return await SuyuAPI.req("POST", "/api/relationship", body);
	},

	async getRelationships(): Promise<GetRelationshipsResponse> {
		return await SuyuAPI.req("GET", "/api/relationship");
	},

	async deleteRelationship(body: DeleteRelationshipRequest): Promise<DeleteRelationshipResponse> {
		return await SuyuAPI.req("DELETE", "/api/relationship", body);
	},
} as const;

export class SuyuAPI {
	static users = apiUsers;
	static notifications = apiNotifications;
	static friendship = apiFriendship;

	static async req(method: string, path: string, body?: any) {
		const res = await fetch(path, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return await res.json();
	}
}
