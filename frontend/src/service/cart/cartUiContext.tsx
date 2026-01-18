import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type CartUiContextType = {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartUiContext = createContext<CartUiContextType | null>(null)

export function CartUiProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <CartUiContext.Provider
      value={{
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartUiContext.Provider>
  )
}

export function useCartUi() {
  const ctx = useContext(CartUiContext)
  if (!ctx) {
    throw new Error('useCartUi must be used within CartUiProvider')
  }
  return ctx
}
