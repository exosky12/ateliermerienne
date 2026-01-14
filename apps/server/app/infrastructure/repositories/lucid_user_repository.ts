import User from '#models/user'
import type { UserRepositoryContract } from '#core/identity/repositories/user_repository_contract'

export default class LucidUserRepository implements UserRepositoryContract {
	async create(data: Partial<User>) {
		return await User.create(data)
	}

	async findByEmail(email: string) {
		return await User.findBy('email', email)
	}

	async verifyCredentials(email: string, password: string) {
		return await User.verifyCredentials(email, password)
	}
}
