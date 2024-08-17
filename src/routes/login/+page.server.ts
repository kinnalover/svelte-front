import { redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
export const actions = {
	login: async ( {cookies, request}) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		console.log(username);
		cookies.set("auth", "regularusertoken", {

			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 1 week
		})

		throw redirect(303, "/")
	},
}