export default class ForceJsonResponseMiddleware {
    handle(ctx, next) {
        ctx.request.request.headers.accept = 'application/json';
        return next();
    }
}
//# sourceMappingURL=force_json_response_middleware.js.map