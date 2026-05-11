export declare const middleware: {
  auth: <
    Args extends [
      (
        | {
            guards?: (keyof import('@adonisjs/auth/types').Authenticators)[]
          }
        | undefined
      )?,
    ],
  >(
    ...args: Args
  ) => {
    name: 'auth'
    reference:
      | import('@adonisjs/core/types/common').LazyImport<
          import('@adonisjs/core/types/http').MiddlewareAsClass
        >
      | import('@adonisjs/core/types/http').MiddlewareAsClass
    args: Args[0]
    handle: import('@adonisjs/core/types/http').ParsedGlobalMiddleware['handle']
  }
}
