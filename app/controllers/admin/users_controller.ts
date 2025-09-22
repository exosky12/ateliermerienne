import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  async render({ inertia, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const users = await User.all()
    const serializedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      isAdmin: String(user.isAdmin),
      createdAt: user.createdAt.toFormat('DD/MM/YYYY HH:mm'),
      updatedAt: user.updatedAt?.toFormat('DD/MM/YYYY HH:mm'),
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
