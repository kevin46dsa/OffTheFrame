import type { OrderItem } from '../../models'

export function calculateSubtotal(items: OrderItem[]): number {
  let total = 0

  for (const item of items) {
    total += item.product.price * item.quantity
  }

  return total
}