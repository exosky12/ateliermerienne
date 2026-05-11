import { HttpContext } from '@adonisjs/core/http'
import { type NextFn } from '@adonisjs/core/types/http'
export default class ContainerBindingsMiddleware {
  handle(ctx: HttpContext, next: NextFn): any
}
