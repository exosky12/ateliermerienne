import Product from "#models/product";
import ProductsList from "~/components/productsList";

interface CreationsProps {
    products: Product[]
}

export default function Creations({ products }: CreationsProps) {
    return (
        <div>
            <h1>Creations</h1>

            <ProductsList products={products} />

        </div>
    )


}