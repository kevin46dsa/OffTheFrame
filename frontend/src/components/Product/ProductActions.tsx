import type { ProductActionsProps } from '../../types/productPageInterfaces'
import { trackEvent } from '../../utils'
import { useCart } from '../../service/cart/useCart'
import { useCallback } from 'react'

export function ProductActions({ productData }: ProductActionsProps) {
  const { items, addItem, removeItem } = useCart()

  const cartItem = items.find(
    item => item.product.id === productData.id
  )

  const addToCart = useCallback(() => {
    addItem(productData)
    trackEvent({
      event: 'add_to_cart',
    })
  }, [addItem, productData, trackEvent])

  const removeFromCart = useCallback(() => {
    removeItem(productData.id)
    trackEvent({
      event: 'remove_from_cart',
    })
  }, [removeItem, productData, trackEvent])

  

  const quantity = cartItem?.quantity ?? 0

  if (!cartItem) {
    return (
      <div>
        <button onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={removeFromCart}>-</button>
      <span>{quantity}</span>
      <button onClick={addToCart}>+</button>
    </div>
  )
}
