import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import SignUp from '#identity/actions/sign_up'
import { emailRule } from '#shared/validation/validation_rules'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class SignUpController {
	static validator = vine.create({
		fullName: vine.string().trim(),
		email: emailRule,
		password: vine.string().minLength(8),
	})

	constructor(private readonly _signUp: SignUp) {}

	async execute({ request, auth, response }: HttpContext) {
		const payload = await request.validateUsing(SignUpController.validator)

		await withTransaction(async () => {
			return response.ok(this._signUp.execute({ ...payload, auth }))
		})

		/**
		 * Voir ce que l'on renvoie quand l'inscription n'est pas réussie (ex: email déjà utilisé)
		 */
	}
}
