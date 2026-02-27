import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import GetUser from '#identity/queries/get_user'

@inject()
export default class GetUserController {
	constructor(private readonly _getUser: GetUser) {}

	async execute({ auth, response }: HttpContext) {
		const user = await this._getUser.execute({ auth })

		return response.ok({ user })
	}
}
