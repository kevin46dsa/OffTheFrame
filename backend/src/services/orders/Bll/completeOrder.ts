import { getOrderById } from './getOrderById'
import { calculateSubtotal } from './helpers'
import { updateOrderDynamoDb} from '../dataAccessLayer'
import type { OrderItem, OrderStatus } from '../models'

export async function completeOrder({
  userId,
  orderId,
  email,
  firstName,
  lastName
}: {
  userId: string
  orderId: string
  email?:string
  firstName?:string
  lastName?:string
}) {
  const order = await getOrderById(userId, orderId)
  if (!order) return null

  if (order.status !== 'CHECKOUT') {
    throw new Error('Order not in CHECKOUT state')
  }

  const now = new Date().toISOString()

  const updatedOrder = {
    ...order,
    email,
    firstName,
    lastName,
    status: 'COMPLETED' as OrderStatus,
    updatedAt: now,
  }

  await updateOrderDynamoDb(updatedOrder)
  return updatedOrder
}
