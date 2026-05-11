import { transactionContext } from '#contexts/transaction_context'
import User from '#identity/models/user'
export default class RegisterCommand {
  async execute(registerInput, auth) {
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
//# sourceMappingURL=register.js.map
