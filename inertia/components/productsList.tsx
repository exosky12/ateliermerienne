import type Product from "#models/product";

interface ProductsListProps {
  products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl shadow p-5 bg-white space-y-3 border border-gray-200"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-base font-medium">Prix : {product.price} €</p>
            <p className="text-sm">Stock : {product.stock}</p>
  
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
  
          </div>
        ))}
      </div>
    );
  }
  