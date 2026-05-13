import { inject } from '@adonisjs/core'
import RegisterCommand from '#identity/commands/register'
import type { HttpContext } from '@adonisjs/core/http'
import { RegisterValidator } from '#identity/validators/user'
import UserTransformer from '#identity/transformers/user'

@inject()
export default class RegisterController {
  constructor(private registerCommand: RegisterCommand) {}

  async run({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(RegisterValidator)

    const user = await this.registerCommand.execute(payload, auth)

    return response.created(UserTransformer.transform(user))
  }
}
