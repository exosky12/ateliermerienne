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
}
