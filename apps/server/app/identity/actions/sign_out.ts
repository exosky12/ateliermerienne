import type { HttpContext } from '@adonisjs/core/http'

interface SignOutParams {
	auth: HttpContext['auth']
}

export default class SignOut {
	async execute(params: SignOutParams) {
		await params.auth.use('web').logout()
	}
}
