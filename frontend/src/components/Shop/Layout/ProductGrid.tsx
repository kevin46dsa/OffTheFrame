import type { ProductGridProps } from '../../../types'
import { ProductCard } from './ProductCard'



export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <p>No products found.</p>
  }

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
