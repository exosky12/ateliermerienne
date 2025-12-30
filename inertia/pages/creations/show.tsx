import Product from '#models/product'
import { Button } from '~/components/ui/button'

interface ShowProps {
  product: Product
  csrfToken: string
}

export default function Show({ product, csrfToken }: ShowProps) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <form method="post" action={`/creations/${product.id}`}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <input type="hidden" name="product_id" value={product.id} />
        <Button type="submit">Ajouter au panier</Button>
      </form>
    </div>
  )
}
