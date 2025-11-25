import type Product from '#models/product'
import { useState } from 'react'
import { Button } from '~/components/button/button'

interface ProductsProps {
  products: Product[]
  csrfToken: string
}

export default function Products({ products, csrfToken }: ProductsProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  return (
    <>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des produits</h1>

      {/* Liste des produits */}
      <div className="grid gap-4 mb-8">
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

            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  product.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {product.isPublished ? "Publié" : "Non publié"}
              </span>

              <button
                onClick={() => setEditingProduct(product)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Éditer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Éditer le produit</h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form method="POST" action={`/admin/products/${editingProduct.id}/edit`} className="space-y-4">
              <input type="hidden" name="_csrf" value={csrfToken} />
              <input type="hidden" name="_method" value="PUT" />

              {/* Nom du produit */}
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  required
                  defaultValue={editingProduct.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  required
                  rows={4}
                  defaultValue={editingProduct.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Prix */}
              <div>
                <label htmlFor="edit-price" className="block text-sm font-medium mb-1">
                  Prix (€) *
                </label>
                <input
                  type="number"
                  id="edit-price"
                  name="price"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingProduct.price}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="edit-stock" className="block text-sm font-medium mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  id="edit-stock"
                  name="stock"
                  required
                  min="0"
                  defaultValue={editingProduct.stock}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* URL de l'image */}
              <div>
                <label htmlFor="edit-imageUrl" className="block text-sm font-medium mb-1">
                  URL de l'image *
                </label>
                <input
                  type="url"
                  id="edit-imageUrl"
                  name="imageUrl"
                  required
                  defaultValue={editingProduct.imageUrl}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Publié */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-isPublished"
                  name="isPublished"
                  value="true"
                  defaultChecked={editingProduct.isPublished}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="edit-isPublished" className="ml-2 text-sm font-medium">
                  Produit publié
                </label>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200 mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 font-bold mb-6">Ajouter un produit</h1>

        <form method="POST" action="/admin/products" className="space-y-6">
          <input type="hidden" name="_csrf" value={csrfToken} />

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nom du produit *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: iPhone 15 Pro"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez le produit..."
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Prix (€) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="99.99"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-1">
              Stock *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
              URL de l'image *
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            value="true"
            className="w-4 h-4 border-gray-300 text-blue-600 rounded focus:ring-blue-500"
          />

            <label htmlFor="isPublished" className="ml-2 text-sm font-medium">
              Publier le produit immédiatement
            </label>
          </div>

          <Button text="Ajouter le produit" type="submit" variant="primary" />
        </form>
      </div>
    </>
  )
}
