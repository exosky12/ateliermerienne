import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig } from '@adonisjs/core/http';
export const appKey = env.get('APP_KEY');
export const appUrl = env.get('APP_URL');
export const http = defineConfig({
    generateRequestId: true,
    allowMethodSpoofing: false,
    useAsyncLocalStorage: false,
    redirect: {
        forwardQueryString: true,
    },
    cookie: {
        domain: '',
        path: '/',
        maxAge: '2h',
        httpOnly: true,
        secure: app.inProduction,
        sameSite: 'lax',
    },
});
//# sourceMappingURL=app.js.map