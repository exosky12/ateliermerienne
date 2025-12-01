import type { HttpContext } from '@adonisjs/core/http'
import PaymentService from '#services/payment_service'
import env from '#start/env'

import stripe from '@vbusatta/adonis-stripe/services/main'

export default class PaymentsController {
    async renderCheckout({ inertia }: HttpContext) {
        return inertia.render('payments/checkout')
    }

    async createCheckoutSession({ auth, response }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized('User must be logged in')
        }

        await user.load('cart')
        const items = user.cart.map(product => ({
            name: product.name,
            price: product.price,
            quantity: 1, // Assuming 1 for now
        }))
        const productIds = user.cart.map(product => product.id)

        if (items.length === 0) {
            return response.badRequest('Cart is empty')
        }

        const service = new PaymentService()

        const domain = env.get('APP_URL', 'http://localhost:3333')
        const successUrl = `${domain}/payments/success`
        const cancelUrl = `${domain}/payments/cancel`

        const session = await service.createCheckoutSession(items, user.id, productIds, successUrl, cancelUrl)

        if (session.url) {
            response.header('X-Inertia-Location', session.url)
            return response.status(409).send('')
        }
        return response.badRequest('Unable to create checkout session')
    }

    async handleSuccess({ inertia }: HttpContext) {
        return inertia.render('payments/success')
    }

    async handleCancel({ inertia }: HttpContext) {
        return inertia.render('payments/cancel')
    }

    async handleWebhook({ response, request }: HttpContext) {
        const signature = request.header('stripe-signature')
        // @ts-ignore
        const rawBody = request.raw()

        if (signature && rawBody) {
            const rawBodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf-8')
            try {
                await stripe.processWebhook(rawBodyBuffer, signature)
            } catch (error) {
                return response.internalServerError(error)
            }
        }

        return response.ok({ received: true })
    }
}