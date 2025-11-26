import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class CreationsController {
  async render({ inertia }: HttpContext) {
    const publishedProducts = await Product.query().where('is_published', true)
    const serializedPublishedProducts = publishedProducts.map((product) => product.serialize())
    return inertia.render('creations/index', {
      products: serializedPublishedProducts,
    })
  }

  async show({ inertia, params, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const product = await Product.query().where('is_published', true).where('id', params.id).firstOrFail();
    const serializedProduct = product.serialize()
    return inertia.render('creations/show', {
      product: serializedProduct,
      csrfToken,
    })
  }

  async store({ params, response, auth }: HttpContext) {
    const product = await Product.query().where('is_published', true).where('id', params.id).firstOrFail();
    auth.check();
    const user = auth.getUserOrFail();
    await user.related('cart').sync([product.id], false)
    return response.redirect().back()
  }
}
