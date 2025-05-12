/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const LogoutController = () => import('#controllers/logout_controller')
const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/register_controller')
const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'render']).as('home.index').use(middleware.silent())

router
  .group(() => {
    router.get('/connexion', [LoginController, 'render']).as('login.index')
    router.post('/connexion', [LoginController, 'store']).as('login.store')
    router.get('/inscription', [RegisterController, 'render']).as('register.index')
    router.post('/inscription', [RegisterController, 'store']).as('register.store')
  })
  .use(middleware.guest())
  .as('auth')

router.get('/logout', [LogoutController, 'render']).as('logout.render').use(middleware.auth())
router.post('/logout', [LogoutController, 'execute']).as('logout.execute').use(middleware.auth())
