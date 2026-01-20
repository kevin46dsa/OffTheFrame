// src/service/order/orderContext.ts
import { createContext } from 'react'
import type { Order } from '../../types'

export type OrderContextValue = {
  order: Order | null
  isLoading: boolean
  checkout: (items: any[]) => Promise<void>
  complete:({
    email,
    firstName,
    lastName
  }: {
    email: string,
    firstName:string,
    lastName:string
  })=>Promise<void>

}

export const OrderContext = createContext<OrderContextValue | null>(null)
