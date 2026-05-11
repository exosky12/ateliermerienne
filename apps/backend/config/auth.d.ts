import type { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'
declare const authConfig: any
export default authConfig
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
