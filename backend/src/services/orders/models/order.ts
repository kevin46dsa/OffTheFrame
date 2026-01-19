// src/models/order.ts

export type OrderStatus =
  | 'DRAFT'
  | 'CHECKOUT'
  | 'COMPLETED'

export type OrderItem = {
  productId: string
  quantity: number
  unitPrice: number
}

export type Order = {
  pk: string
  sk: string

  orderId: string
  anonUserId: string
  sessionId?: string

  status: OrderStatus

  items: OrderItem[]
  subtotal: number
  currency: string

  createdAt: string
  updatedAt: string
}



export type OrderDbItem = Order & {
  pk: string
  sk: string
}