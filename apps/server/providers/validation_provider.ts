import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { ApplicationService } from '@adonisjs/core/types'

export default class ValidationProvider {
	constructor(protected app: ApplicationService) {}

	async boot() {
		vine.messagesProvider = new SimpleMessagesProvider({
			required: 'Le champ {{ field }} est obligatoire',
			email: 'Le champ {{ field }} doit être une adresse email valide',
			minLength: 'Le champ {{ field }} doit contenir au moins {{ minLength }} caractères',
			maxLength: 'Le champ {{ field }} doit contenir au plus {{ maxLength }} caractères',
			regex: 'Le champ {{ field }} doit contenir au moins une majuscule et un caractère spécial',
		})
	}
}
