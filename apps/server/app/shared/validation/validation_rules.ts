import vine from '@vinejs/vine'

export const emailRule = vine
	.string()
	.trim()
	.email()
	.unique({ table: 'users', column: 'email', caseInsensitive: true })
