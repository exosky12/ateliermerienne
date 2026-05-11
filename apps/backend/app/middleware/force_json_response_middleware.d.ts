import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
export default class ForceJsonResponseMiddleware {
    handle(ctx: HttpContext, next: NextFn): any;
}
