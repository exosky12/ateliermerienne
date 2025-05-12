import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class RegisterController {
  async render({ inertia, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const disk = drive.use()
    const fileURL = await disk.getUrl('sacSweety.png')
    return inertia.render('register/index', { fileURL, csrfToken })
  }

  async store({ request, response, auth }: HttpContext) {
    const validatedData = await registerValidator.validate(
      request.only(['email', 'password', 'confirmPassword'])
    )
    const { password, confirmPassword } = validatedData
    if (password !== confirmPassword) {
      return response.badRequest('Passwords do not match')
    }
    const data = {
      email: validatedData.email,
      password: validatedData.password,
    }
    const user = await User.create(data)
    await auth.use('web').login(user)
    await user.save()

    response.redirect('/')
  }
}
