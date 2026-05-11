import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [controllers.identity.Register, 'run'])
      })
      .prefix('auth')
      .as('auth')
  })
  .prefix('/api/v1')
