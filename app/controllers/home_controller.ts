import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async render({ inertia }: HttpContext) {
    return inertia.render('home')
  }
}
