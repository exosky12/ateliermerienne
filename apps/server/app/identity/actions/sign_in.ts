import type { HttpContext } from '@adonisjs/core/http'

import User from '#identity/models/user'

interface SignInParams {
	email: string
	password: string
	auth: HttpContext['auth']
}

export default class SignIn {
	async execute(params: SignInParams) {
		const user = await User.verifyCredentials(params.email, params.password)
		console.log(user)
		await params.auth.use('web').login(user)
	}
}
