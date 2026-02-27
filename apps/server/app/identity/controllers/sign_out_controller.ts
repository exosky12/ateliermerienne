import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import SignOut from '#identity/actions/sign_out'

@inject()
export default class SignOutController {
	constructor(private readonly _signOut: SignOut) {}

	async execute({ auth, response }: HttpContext) {
		await this._signOut.execute({ auth })
		return response.ok({ message: 'Logged out successfully' })
	}
}
