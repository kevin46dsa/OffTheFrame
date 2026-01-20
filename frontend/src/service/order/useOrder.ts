import { useContext } from 'react'
import { OrderContext } from './orderContext'

export function useOrder() {
  const ctx = useContext(OrderContext)

  if (!ctx) {
    throw new Error('useOrder must be used within OrderProvider')
  }

  return ctx
}
