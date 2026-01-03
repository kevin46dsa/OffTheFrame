import { useContext } from 'react'
import { CartContext } from './cartContext'
import type { Product } from '../../types/productTypes'

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  const { state, dispatch } = context

  return {
    items: state.items,
    addItem: (product: Product) =>
      dispatch({ type: 'ADD_ITEM', payload: product }),
    removeItem: (productId: string) =>
      dispatch({ type: 'REMOVE_ITEM', payload: productId }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' })
  }
}
