import { Env } from '@adonisjs/core/env'
export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test']),
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),
  APP_KEY: Env.schema.secret(),
  APP_URL: Env.schema.string({ format: 'url', tld: false }),
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory', 'database']),
})
//# sourceMappingURL=env.js.map
