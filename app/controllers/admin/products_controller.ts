import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  async render({ inertia, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const serializedProducts = await Product.all().then((products) =>
      products.map((product) => product.serialize())
    )
    return inertia.render('admin/products/index', {
      products: serializedProducts,
      csrfToken: csrfToken,
    })
  }

  async store({ request, response }: HttpContext) {
    const { name, description, price, stock, imageUrl } = request.only([
      'name',
      'description',
      'price',
      'stock',
      'imageUrl',
    ])
    const isPublished = request.input('isPublished') === 'true'
    await Product.create({ name, description, price, stock, imageUrl, isPublished })
    return response.redirect('/admin/products')
  }

  async update({ params, request, response }: HttpContext) {
    const { name, description, price, stock, imageUrl } = request.only([
      'name',
      'description',
      'price',
      'stock',
      'imageUrl',
    ])
    const isPublished = request.input('isPublished') === 'true'
    const product = await Product.findOrFail(params.id)
    await product.merge({ name, description, price, stock, imageUrl, isPublished }).save()
    return response.redirect('/admin/products')
  }
}
