import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig, syncDestination, targets } from '@adonisjs/core/logger';
const loggerConfig = defineConfig({
    default: 'app',
    loggers: {
        app: {
            enabled: true,
            name: env.get('APP_NAME'),
            level: env.get('LOG_LEVEL'),
            destination: !app.inProduction ? await syncDestination() : undefined,
            transport: {
                targets: [targets.file({ destination: 1 })],
            },
        },
    },
});
export default loggerConfig;
//# sourceMappingURL=logger.js.map