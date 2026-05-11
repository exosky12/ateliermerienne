import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
export default class SilentAuthMiddleware {
  handle(ctx: HttpContext, next: NextFn): Promise<any>
}
