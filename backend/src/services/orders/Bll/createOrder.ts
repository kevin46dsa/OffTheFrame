import { Order} from "../models"
import { v4 as uuid } from 'uuid'
import { createOrderDynamoDb} from '../dataAccessLayer'


export async function createOrder({
  anonUserId,
  sessionId
}: {
  anonUserId: string,
  sessionId: string
}): Promise<Order> {
  const now = new Date().toISOString()
  const orderId = `ord_${uuid()}`

  const order: Order = {
    pk: anonUserId,
    sk: orderId,

    orderId,
    anonUserId,
    sessionId,

    status: 'DRAFT',

    items: [],
    subtotal: 0,
    currency: 'USD',

    createdAt: now,
    updatedAt: now,
  }

  await createOrderDynamoDb({
    ...order,
  })

  return order
}