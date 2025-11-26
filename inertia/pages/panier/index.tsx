import Product from "#models/product"

interface PanierProps {
    cartItems: Product[]
}

export default function Panier({ cartItems }: PanierProps) {
    return (
        <div>
            <h1>panier</h1>
            {cartItems.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}