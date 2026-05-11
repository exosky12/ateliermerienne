export default class SilentAuthMiddleware {
    async handle(ctx, next) {
        await ctx.auth.check();
        return next();
    }
}
//# sourceMappingURL=silent_auth_middleware.js.map