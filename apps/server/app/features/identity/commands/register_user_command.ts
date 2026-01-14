import { inject } from '@adonisjs/core'

import { RegisterDto } from '#features/identity/dtos/register_dto'
import { UserRepositoryContract } from '#core/identity/repositories/user_repository_contract'

@inject()
export class RegisterUserCommand {
	constructor(private userRepository: UserRepositoryContract) {}

	async handle(data: RegisterDto) {
		const existing = await this.userRepository.findByEmail(data.email)
		if (existing) {
			throw new Error('Cet email est déjà utilisé')
		}

		return await this.userRepository.create(data)
	}
}
