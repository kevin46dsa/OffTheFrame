import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../types'
import { ProductActions } from '../../Product/ProductActions'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <div>
      <h3 onClick={() => navigate(`/product/${product.id}`)}>
        {product.title}
      </h3>

      <p>{product.artist}</p>
      <p>${product.price}</p>

      <ProductActions productData={product} />
    </div>
  )
}
