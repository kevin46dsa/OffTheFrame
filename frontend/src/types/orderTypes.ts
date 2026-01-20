import type { Product } from "./productTypes"

export type OrderStatus =
  | 'DRAFT'
  | 'CHECKOUT'
  | 'COMPLETED'
  | 'CANCELLED'

  export type OrderItem = {
    product: Product
    quantity: number
  }

export type Order = {
  pk: string
  sk: string

  orderId: string
  anonUserId: string
  sessionId: string

  status: OrderStatus

  items: OrderItem[]
  subtotal: number
  currency: string

  createdAt: string
  updatedAt: string
}
