import { transactionContext } from '#contexts/transaction_context'
import User from '#identity/models/user'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'
import { RegisterValidator } from '#identity/validators/user'

type RegisterType = Infer<typeof RegisterValidator>

export default class RegisterCommand {
  async execute(registerInput: RegisterType, auth: HttpContext['auth']) {
    const trx = transactionContext.get()

    const user = await User.create(
      {
        email: registerInput.email,
        password: registerInput.password,
        fullName: registerInput.fullName,
      },
      {
        client: trx,
      }
    )

    await auth.use('web').login(user)

    return user
  }
}
