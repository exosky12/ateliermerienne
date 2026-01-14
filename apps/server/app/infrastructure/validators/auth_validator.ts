import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
	vine.object({
		fullName: vine.string().trim(),
		email: vine.string().email().normalizeEmail(),
		password: vine
			.string()
			.minLength(8)
			.maxLength(64)
			.regex(/^(?=.*[A-Z])(?=.*[!"#$%&()*,.:<>?@^{|}])/),
	})
)

export const loginValidator = vine.compile(
	vine.object({
		email: vine.string().email().normalizeEmail(),
		password: vine.string().minLength(8).maxLength(64),
	})
)
