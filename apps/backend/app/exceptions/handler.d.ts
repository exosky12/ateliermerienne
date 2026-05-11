import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http';
export default class HttpExceptionHandler extends ExceptionHandler {
    protected debug: boolean;
    handle(error: unknown, ctx: HttpContext): Promise<any>;
    report(error: unknown, ctx: HttpContext): Promise<void>;
}
