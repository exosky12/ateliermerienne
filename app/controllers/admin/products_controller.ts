import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async render({ inertia, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const serializedProducts = ''
    return inertia.render('admin/products/index', {
      products: serializedProducts,
      csrfToken: csrfToken,
    })
  }
}
