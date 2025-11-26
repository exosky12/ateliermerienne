import type { HttpContext } from '@adonisjs/core/http'

export default class PanierController {
    async render({ inertia, auth, request }: HttpContext) {
        const user = auth.user
        let cartItems: any[] = []

        if (user) {
            await user.load('cart')
            cartItems = user.cart.map((product) => product.serialize())
        }

        return inertia.render('panier/index', { cartItems, csrfToken: request.csrfToken })
    }

    async destroy({ inertia, auth, request }: HttpContext) {
        const user = auth.user
        const productId = request.param('id')
        await user?.related('cart').detach([productId])
        await user?.load('cart')
        const cartItems = user?.cart.map((product) => product.serialize())
        return inertia.render('panier/index', { cartItems, csrfToken: request.csrfToken })
    }
}
