import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  async render({ inertia, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const users = await User.query().preload('cart').orderBy('createdAt', 'desc')
    const serializedUsers = users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt.toFormat('dd/MM/yyyy HH:mm'),
      cartCount: user.cart.length,
      cartTotal: user.cart.reduce((total, product) => total + product.price, 0),
      cart: user.cart.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      })),
    }))
    return inertia.render('admin/users/index', { users: serializedUsers, csrfToken: csrfToken })
  }

  async destroy({ params, response }: HttpContext) {
    console.log(params.id)
    const user = await User.findOrFail(params.id)
    console.log(user)
    await user.delete()
    return response.redirect().back()
  }
}
