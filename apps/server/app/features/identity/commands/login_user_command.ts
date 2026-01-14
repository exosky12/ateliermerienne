import { inject } from '@adonisjs/core'

import { LoginDto } from '#features/identity/dtos/login_dto.js'
import { UserRepositoryContract } from '#core/identity/repositories/user_repository_contract'

@inject()
export class LoginUserCommand {
	constructor(private userRepository: UserRepositoryContract) {}

	async handle(data: LoginDto) {
		const isValid = await this.userRepository.verifyCredentials(data.email, data.password)
		if (!isValid) {
			throw new Error('Identifiants incorrectes.')
		}

		return isValid
	}
}
