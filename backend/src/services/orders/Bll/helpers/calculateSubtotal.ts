import { OrderItem } from "../../models"

export function calculateSubtotal(items: OrderItem[]) {
    return items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    )
  }