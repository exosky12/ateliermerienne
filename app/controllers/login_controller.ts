import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth'

export default class LoginController {
  async render({ inertia, request }: HttpContext) {
    const csrfToken = request.csrfToken
    return inertia.render('login/index', { csrfToken })
  }

  async store({ auth, request, response, session }: HttpContext) {
    const { email, password } = await loginValidator.validate(request.only(['email', 'password']))
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      session.flashErrors({
        E_INVALID_CREDENTIALS: "Aucun compte n'a été trouvé avec les identifiants fournis.",
      })

      return response.redirect().back()
    }

    await auth.use('web').login(user)
    response.redirect('/')
  }
}
