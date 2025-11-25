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

const ProductsController = () => import('#controllers/admin/products_controller')
const UsersController = () => import('#controllers/admin/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/register_controller')
const HomeController = () => import('#controllers/home_controller')
const CreationsController = () => import('#controllers/creations_controller')

router.get('/', [HomeController, 'render']).as('home.index').use(middleware.silent())

router
  .get('/creations', [CreationsController, 'render'])
  .as('creations.index')
  .use(middleware.silent())

router
  .group(() => {
    router.get('/auth/connexion', [LoginController, 'render']).as('login.index')
    router.post('/auth/connexion', [LoginController, 'store']).as('login.store')

    router.get('/auth/inscription', [RegisterController, 'render']).as('register.index')
    router.post('/auth/inscription', [RegisterController, 'store']).as('register.store')

    router.get('/auth/google', [AuthController, 'google']).as('auth.google')
    router
      .get('/auth/google/callback', [AuthController, 'googleCallback'])
      .as('auth.googleCallback')

    router.get('/auth/facebook', [AuthController, 'facebook']).as('auth.facebook')
    router
      .get('/auth//facebook/callback', [AuthController, 'facebookCallback'])
      .as('auth.facebookCallback')
  })
  .use(middleware.guest())
  .as('auth')

router.get('/auth/logout', [AuthController, 'logout']).as('logout.execute').use(middleware.auth())

router
  .group(() => {
    router.get('/admin/users', [UsersController, 'render']).as('admin.users.index')
    router.delete('/admin/users/:id', [UsersController, 'destroy']).as('admin.users.destroy')

    router.get('admin/products', [ProductsController, 'render']).as('admin.products.index')
    router.post('/admin/products', [ProductsController, 'store']).as('admin.products.store')
    router
      .post('/admin/products/:id/edit', [ProductsController, 'update'])
      .as('admin.products.update')
    router
      .delete('/admin/products/:id/delete', [ProductsController, 'destroy'])
      .as('admin.products.destroy')
    router
      .post('/admin/products/:id/delete', [ProductsController, 'destroy'])
      .as('admin.products.destroy.post')
  })
  .use(middleware.auth())
  .use(middleware.adminOnly())
  .as('admin')
