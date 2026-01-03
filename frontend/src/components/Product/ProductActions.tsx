import type { ProductActionsProps } from '../../types/productPageInterfaces'
import { useCart } from '../../service/cart/useCart'

export function ProductActions({ productData }: ProductActionsProps) {
  const { items, addItem, removeItem } = useCart()

  const cartItem = items.find(
    item => item.product.id === productData.id
  )

  const quantity = cartItem?.quantity ?? 0

  if (!cartItem) {
    return (
      <div>
        <button onClick={() => addItem(productData)}>
          Add to Cart
        </button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => removeItem(productData.id)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => addItem(productData)}>+</button>
    </div>
  )
}
