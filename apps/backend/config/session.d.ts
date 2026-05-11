declare const sessionConfig: import('@adonisjs/core/types').ConfigProvider<
  import('@adonisjs/session/types').SessionConfig & {
    store: 'cookie' | 'database'
    stores: {
      cookie: import('@adonisjs/session/types').SessionStoreFactory
      database: import('@adonisjs/session/types').SessionStoreFactory
    }
  }
>
export default sessionConfig
