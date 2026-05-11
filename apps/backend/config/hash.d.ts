declare const hashConfig: import('@adonisjs/core/types').ConfigProvider<{
  default?: 'scrypt' | undefined
  list: {
    scrypt: () => import('@adonisjs/core/hash/drivers/scrypt').Scrypt
  }
}>
export default hashConfig
declare module '@adonisjs/core/types' {
  interface HashersList extends InferHashers<typeof hashConfig> {}
}
