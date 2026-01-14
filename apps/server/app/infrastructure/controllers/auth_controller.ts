import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { LoginUserCommand } from '#features/identity/commands/login_user_command'
import { RegisterUserCommand } from '#features/identity/commands/register_user_command'
import { registerValidator, loginValidator } from '#infrastructure/validators/auth_validator'

@inject()
export default class AuthController {
	constructor(
		private registerCommand: RegisterUserCommand,
		private loginCommand: LoginUserCommand
	) {}

	async register({ request, response, auth }: HttpContext) {
		const payload = await request.validateUsing(registerValidator)

		const user = await this.registerCommand.handle(payload)

		await auth.use('web').login(user)

		return response.created(user)
	}

	async login({ request, response, auth }: HttpContext) {
		const payload = await request.validateUsing(loginValidator)

		const user = await this.loginCommand.handle(payload)

		await auth.use('web').login(user)

		return response.ok(user)
	}

	async isConnected({ auth }: HttpContext) {
		const isConnected = await auth.use('web').check()
		return { isConnected }
	}

	async logout({ auth, response }: HttpContext) {
		await auth.use('web').logout()
		return response.ok({ message: 'Logged out' })
	}
}
