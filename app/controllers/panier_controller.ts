import type { HttpContext } from '@adonisjs/core/http'

export default class PanierController {
    async render({ inertia, auth }: HttpContext) {
        const user = auth.user
        console.log(user)
        let cartItems: any[] = []

        if (user) {
            await user.load('cart')
            cartItems = user.cart.map((product) => product.serialize())
        }

        return inertia.render('panier/index', { cartItems })
    }
}
