import { Logger } from '@adonisjs/core/logger';
import { HttpContext } from '@adonisjs/core/http';
export default class ContainerBindingsMiddleware {
    handle(ctx, next) {
        ctx.containerResolver.bindValue(HttpContext, ctx);
        ctx.containerResolver.bindValue(Logger, ctx.logger);
        return next();
    }
}
//# sourceMappingURL=container_bindings_middleware.js.map