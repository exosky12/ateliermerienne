import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async render(ctx: HttpContext) {
    await this.execute(ctx)
  }
  async execute({ auth, response }: HttpContext) {
    console.log('te')
    await auth.use('web').logout()
    response.redirect().toRoute('home.index')
  }
}
