import { HCAPTCHA_KEY } from "$env/static/private";
import { PUBLIC_SITE_KEY } from "$env/static/public";
import { userRepo } from "$lib/server/repo";
import { json } from "$lib/server/util/index.js";
import type { LoginResponse, LoginRequest } from "$types/api";
import bcrypt from "bcrypt";
import { verify } from "hcaptcha";

export async function POST({ request, getClientAddress }) {
	const body: LoginRequest = await request.json();
	if (
		!body.email ||
		!body.password ||
		body.email.trim() === "" ||
		body.password.trim() === "" ||
		body.email.length > 320 ||
		body.password.length > 320 ||
		!body.captchaToken
	)
		return json<LoginResponse>({
			success: false,
			error: "missing fields",
		});
	const res = await verify(HCAPTCHA_KEY, body.captchaToken, getClientAddress(), PUBLIC_SITE_KEY);
	if (!res.success) {
		return json<LoginResponse>({
			success: false,
			error: "invalid captcha",
		});
	}
	const user = await userRepo.findOne({
		where: {
			email: body.email,
		},
		select: ["password", "apiKey"],
		loadEagerRelations: false,
	});
	if (!user)
		return json<LoginResponse>({
			success: false,
			error: "user not found",
		});
	if (!(await bcrypt.compare(body.password, user.password))) {
		return json<LoginResponse>({
			success: false,
			error: "invalid password",
		});
	}
	return json<LoginResponse>({
		success: true,
		token: user.apiKey,
	});
}
