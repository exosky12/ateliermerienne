import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import SignOut from '#identity/actions/sign_out'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class SignOutController {
	constructor(private readonly _signOut: SignOut) {}

	async execute({ auth, response }: HttpContext) {
		await withTransaction(async () => {
			return response.ok(this._signOut.execute({ auth }))
		})

		/**
		 * Ici par ex on pourrait faire un dispatchAfterCommit en envoyant un mail de confirmation
		 */

		/**
		 * Voir ce que l'on renvoie quand la déconnexion n'est pas réussie
		 */
	}
}
