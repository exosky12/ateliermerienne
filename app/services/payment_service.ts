import { Stripe } from 'stripe'
import stripe from '@vbusatta/adonis-stripe/services/main'
import User from '#models/user'
import Product from '#models/product'

stripe.onEvent('checkout.session.completed', async (event) => {
  const session = event.data.object as Stripe.Checkout.Session
  const userId = session.metadata?.userId
  const productIds = session.metadata?.productIds ? JSON.parse(session.metadata.productIds) : []

  if (userId && productIds.length > 0) {
    try {
      const user = await User.find(userId)
      if (user) {
        // Create Order
        const order = await user.related('orders').create({
          status: 'paid',
          totalAmount: session.amount_total || 0,
          stripeSessionId: session.id,
        })

        // Get products to snapshot data
        const products = await Product.query().whereIn('id', productIds)

        // Create Order Items
        await order.related('items').createMany(
          products.map((product) => ({
            productId: product.id,
            productName: product.name,
            price: Math.round(product.price * 100), // Assuming product.price is in EUR, convert to cents
            quantity: 1,
          }))
        )

        // Clear cart
        await user.related('cart').detach(productIds)
      }

      // Unpublish products
      await Product.query().whereIn('id', productIds).update({ isPublished: false })
    } catch (error) {
      console.error('Error processing webhook:', error)
    }
  }
})

export default class PaymentService {
  async createCheckoutSession(
    items: { name: string; price: number; quantity: number }[],
    userId: number,
    productIds: number[],
    successUrl: string,
    cancelUrl: string
  ) {
    const session = await stripe.api.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId.toString(),
        productIds: JSON.stringify(productIds),
      },
    })

    return session
  }
}
