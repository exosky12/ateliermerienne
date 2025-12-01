import { Head, router } from '@inertiajs/react'
import { FormEvent } from 'react'

export default function Checkout() {
    const handleCheckout = (e: FormEvent) => {
        e.preventDefault()
        // Example item - replace with real data or cart integration
        router.post('/payments/checkout', {
            items: [
                { priceId: 'price_1QWXYZ...', quantity: 1 }
            ]
        })
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <Head title="Checkout" />
            <h1 className="text-2xl font-bold mb-4">Paiement</h1>
            <p className="mb-4">Ceci est une page de test pour le paiement.</p>
            <form onSubmit={handleCheckout}>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                    Payer avec Stripe
                </button>
            </form>
        </div>
    )
}
