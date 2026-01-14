import type User from '#infrastructure/models/user'

export abstract class UserRepositoryContract {
	abstract findByEmail(email: string): Promise<User | null>
	abstract create(data: any): Promise<User>
	abstract verifyCredentials(email: string, password: string): Promise<User | null>
}
