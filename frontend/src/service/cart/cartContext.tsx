import { createContext, useReducer } from 'react'
import { cartReducer, initialCartState } from './cartReducer'
import type { CartState, CartAction } from '../../types/cartTypes'

type CartContextValue = {
  state: CartState
  dispatch: React.Dispatch<CartAction>
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
