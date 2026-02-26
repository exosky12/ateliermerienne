import type { HttpContext } from '@adonisjs/core/http'

import User from '#identity/models/user'
import { transactionContext } from '#shared/contexts/transaction_context'

interface SignUpParams {
	email: string
	password: string
	fullName: string
	auth: HttpContext['auth']
}

export default class SignUp {
	async execute(params: SignUpParams) {
		const trx = transactionContext.get()

		const user = await User.create(
			{
				email: params.email,
				password: params.password,
				fullName: params.fullName,
			},
			{
				client: trx,
			}
		)

		await params.auth.use('web').login(user)

		return { user }
	}
}
