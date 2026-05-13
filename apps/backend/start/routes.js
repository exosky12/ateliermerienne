/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#identity/routes'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('register', [controllers.identity.Register, 'run']).as('register')
