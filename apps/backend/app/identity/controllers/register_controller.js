var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return (c > 3 && r && Object.defineProperty(target, key, r), r)
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
import { inject } from '@adonisjs/core'
import RegisterCommand from '#identity/commands/register'
import { RegisterValidator } from '#identity/validators/user'
import UserTransformer from '#identity/transformers/user'
let RegisterController = class RegisterController {
  registerCommand
  constructor(registerCommand) {
    this.registerCommand = registerCommand
  }
  async run({ request, response, auth }) {
    const payload = await request.validateUsing(RegisterValidator)
    const user = await this.registerCommand.execute(payload, auth)
    return response.created(UserTransformer.transform(user))
  }
}
RegisterController = __decorate(
  [inject(), __metadata('design:paramtypes', [RegisterCommand])],
  RegisterController
)
export default RegisterController
//# sourceMappingURL=register.js.map
