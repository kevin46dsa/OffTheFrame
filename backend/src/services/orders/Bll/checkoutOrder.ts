import { getOrderById } from './getOrderById'
import { calculateSubtotal } from './helpers'
import { updateOrderDynamoDb} from '../dataAccessLayer'
import type { OrderItem, OrderStatus } from '../models'

export async function checkoutOrder({
  userId,
  orderId,
  items,
}: {
  userId: string
  orderId: string
  items: OrderItem[]
}) {
  const order = await getOrderById(userId, orderId)
  if (!order) return null

  if (order.status === 'COMPLETED') {
    throw new Error('Order in COMPLETED state')
  }

  const subtotal = calculateSubtotal(items)
  const now = new Date().toISOString()

  const updatedOrder = {
    ...order,
    items,
    subtotal,
    status: "CHECKOUT" as OrderStatus,
    updatedAt: now,
  }

  await updateOrderDynamoDb(updatedOrder)
  return updatedOrder
}
