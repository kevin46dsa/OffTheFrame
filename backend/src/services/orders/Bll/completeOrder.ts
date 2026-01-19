import { getOrderById } from './getOrderById'
import { calculateSubtotal } from './helpers'
import { updateOrderDynamoDb} from '../dataAccessLayer'
import type { OrderItem, OrderStatus } from '../models'

export async function completeOrder({
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

  if (order.status !== 'CHECKOUT') {
    throw new Error('Order not in CHECKOUT state')
  }

  const subtotal = calculateSubtotal(items)
  const now = new Date().toISOString()

  const updatedOrder = {
    ...order,
    items,
    subtotal,
    status: 'COMPLETED' as OrderStatus,
    updatedAt: now,
  }

  await updateOrderDynamoDb(updatedOrder)
  return updatedOrder
}
