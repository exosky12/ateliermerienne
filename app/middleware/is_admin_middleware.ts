import type { HttpContext } from '@adonisjs/core/http'

export default class IsAdminMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const user = ctx.auth.user

    if (!user || !user.isAdmin) {
      return ctx.response.unauthorized({ message: 'Accès réservé aux administrateurs' })
    }

    await next()
  }
}
