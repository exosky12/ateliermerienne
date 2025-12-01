import Product from "#models/product"
import { router } from '@inertiajs/react'

interface PanierProps {
    cartItems: Product[]
    csrfToken: string
}

export default function Panier({ cartItems, csrfToken }: PanierProps) {
    const handlePayment = () => {
        router.post('/payments/checkout')
    }

    return (
        <div>
            <h1>panier</h1>
            {cartItems.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <form method="POST" action={`/panier/${product.id}?_method=DELETE`}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <button type="submit">Supprimer</button>
                    </form>
                </div>
            ))}

            {cartItems.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={handlePayment}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                        Payer
                    </button>
                </div>
            )}
        </div>
    )
}