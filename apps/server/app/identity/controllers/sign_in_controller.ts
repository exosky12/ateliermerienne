import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import SignIn from '#identity/actions/sign_in'

@inject()
export default class SignInController {
	static validator = vine.create({
		email: vine.string().email(),
		password: vine.string(),
	})

	constructor(private readonly _signIn: SignIn) {}

	async execute({ request, response, auth }: HttpContext) {
		const payload = await request.validateUsing(SignInController.validator)
		return response.ok(await this._signIn.execute({ ...payload, auth }))
	}
}
