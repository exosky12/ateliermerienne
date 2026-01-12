import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
	async login({ request, auth }: HttpContext) {
		const { email, password } = request.only(['email', 'password'])
		const user = await User.verifyCredentials(email, password)
		await auth.use('web').login(user)
	}

	async register({ request, auth }: HttpContext) {
		const { email, password } = request.only(['email', 'password'])
		const user = await User.create({ email, password })
		await auth.use('web').login(user)
	}

	async isConnected({ auth }: HttpContext) {
		const isConnected = await auth.use('web').check()
		return { isConnected }
	}

	async logout({ auth }: HttpContext) {
		await auth.use('web').logout()
		return { message: 'Logged out' }
	}
}
