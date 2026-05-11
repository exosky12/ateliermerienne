import User from '#identity/models/user'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'
import { RegisterValidator } from '#identity/validators/user'
type RegisterType = Infer<typeof RegisterValidator>
export default class RegisterCommand {
  execute(registerInput: RegisterType, auth: HttpContext['auth']): Promise<User>
}
