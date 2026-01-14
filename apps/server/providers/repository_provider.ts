import type { ApplicationService } from '@adonisjs/core/types'

import { UserRepositoryContract } from '#core/identity/repositories/user_repository_contract'

export default class RepositoryProvider {
	constructor(protected app: ApplicationService) {}

	register() {
		this.app.container.bind(UserRepositoryContract, async () => {
			const { default: LucidUserRepository } =
				await import('#infrastructure/repositories/lucid_user_repository')
			return new LucidUserRepository()
		})
	}
}
