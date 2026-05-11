export default class AuthMiddleware {
    async handle(ctx, next, options = {}) {
        await ctx.auth.authenticateUsing(options.guards);
        return next();
    }
}
//# sourceMappingURL=auth_middleware.js.map