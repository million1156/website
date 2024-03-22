// TODO: refactor into external utils (ie Suyu.createAccount() or something???)

import { userRepo } from "$lib/server/repo";
import type { SuyuUser } from "$lib/server/schema";
import { json } from "$lib/server/util";
import { useAuth } from "$lib/util/api";
import type {
	CreateAccountRequest,
	CreateAccountResponse,
	DeleteAccountResponse,
	GetUserResponse,
} from "$types/api";
import crypto from "crypto";
import { promisify } from "util";
import { verify } from "hcaptcha";
import { PUBLIC_SITE_KEY } from "$env/static/public";
import { HCAPTCHA_KEY } from "$env/static/private";
import validator from "validator";
import bcrypt from "bcrypt";

const randomBytes = promisify(crypto.randomBytes);

async function genKey(username: string) {
	const random = (await randomBytes(80)).toString("hex");
	let apiKey = `${username}:${random}`;
	let b64ApiKey = Buffer.from(apiKey).toString("base64");
	if (b64ApiKey.length > 80) {
		b64ApiKey = b64ApiKey.slice(0, 80);
	}
	// decode b64ApiKey
	apiKey = Buffer.from(b64ApiKey, "base64").toString("utf-8");
	return apiKey;
}

export async function POST({ request, getClientAddress }) {
	const body: CreateAccountRequest = await request.json();
	if (!body.username || !body.email || !body.captchaToken || !body.password) {
		return json<CreateAccountResponse>({
			success: false,
			error: "missing fields",
		});
	}
	if (body.username.length < 3 || body.username.length > 24 || body.username.trim() === "") {
		return json<CreateAccountResponse>({
			success: false,
			error: "invalid username",
		});
	}
	if (!validator.isEmail(body.email)) {
		return json<CreateAccountResponse>({
			success: false,
			error: "invalid email",
		});
	}
	const res = await verify(HCAPTCHA_KEY, body.captchaToken, getClientAddress(), PUBLIC_SITE_KEY);
	if (!res.success) {
		return json<CreateAccountResponse>({
			success: false,
			error: "missing fields!",
		});
	}
	// check if user exists
	const user = await userRepo.findOne({
		where: [
			{
				username: body.username,
			},
			{
				email: body.email,
			},
		],
	});
	if (user) {
		return json<CreateAccountResponse>({
			success: false,
			error: "user already exists",
		});
	}
	// the api key can only be 80 characters total, including the username and colon
	const key = await genKey(body.username);
	const password = await bcrypt.hash(body.password, 10);
	// sha256 hash of the email, trimmed and to lowercase
	const emailHash = crypto
		.createHash("sha256")
		.update(body.email.trim().toLowerCase())
		.digest("hex");
	const createdUser: SuyuUser = userRepo.create({
		username: body.username,
		avatarUrl: `https://gravatar.com/avatar/${emailHash}?d=retro`,
		displayName: body.username,
		roles: ["user"],
		apiKey: key,
		email: body.email,
		password,
	});
	console.log(createdUser);
	await userRepo.save(createdUser);
	return json<CreateAccountResponse>({
		success: true,
		token: createdUser.apiKey,
		user: createdUser,
	});
}

export async function GET({ request, getClientAddress }) {
	const user = await useAuth(request);
	if (!user) {
		return json<GetUserResponse>({
			success: false,
			error: "unauthorized",
		});
	}
	return json<GetUserResponse>({
		success: true,
		user,
	});
}

export async function DELETE({ request, getClientAddress }) {
	const user = await useAuth(request);
	if (!user) {
		return json<DeleteAccountResponse>({
			success: false,
			error: "unauthorized",
		});
	}
	await userRepo.remove(user);
	return json<DeleteAccountResponse>({
		success: true,
	});
}
