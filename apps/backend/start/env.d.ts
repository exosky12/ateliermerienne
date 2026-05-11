import { Env } from '@adonisjs/core/env'
declare const _default: Env<{
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
  HOST: string
  LOG_LEVEL: string
  APP_KEY: import('@adonisjs/core/helpers').Secret<string>
  APP_URL: string
  SESSION_DRIVER: 'cookie' | 'database' | 'memory'
}>
export default _default
