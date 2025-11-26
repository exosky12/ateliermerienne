import Product from "#models/product"

interface PanierProps {
    cartItems: Product[]
    csrfToken: string
}

export default function Panier({ cartItems, csrfToken }: PanierProps) {
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
        </div>
    )
}