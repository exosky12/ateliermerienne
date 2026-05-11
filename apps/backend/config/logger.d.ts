declare const loggerConfig: any;
export default loggerConfig;
declare module '@adonisjs/core/types' {
    interface LoggersList extends InferLoggers<typeof loggerConfig> {
    }
}
