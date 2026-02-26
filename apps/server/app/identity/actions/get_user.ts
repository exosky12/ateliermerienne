import type { HttpContext } from '@adonisjs/core/http'

import type User from '#identity/models/user'

interface GetUserParams {
	auth: HttpContext['auth']
}

export default class GetUser {
	async execute(params: GetUserParams): Promise<User | null> {
		const isAuthenticated = await params.auth.use('web').check()
		if (!isAuthenticated) {
			return null
		}

		return params.auth.use('web').user!
	}
}
