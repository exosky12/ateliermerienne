import RegisterCommand from '#identity/commands/register'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#identity/transformers/user'
export default class RegisterController {
  private registerCommand
  constructor(registerCommand: RegisterCommand)
  run({ request, response, auth }: HttpContext): Promise<{
    __response: import('@adonisjs/core/transformers').Item<UserTransformer, 1, 'toObject'>
    __status: 201
  }>
}
