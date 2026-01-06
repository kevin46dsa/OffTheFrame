import { Order } from '../models'   


const orderSample: Order = {
  id: 'o1',
  userId: 'u1',
  items: [
    { id: 'p1', quantity: 1 },
  ],
  total: 100,
}

export async function createOrderData(order: Order): Promise<Order> {
  console.log('Creating order for user', order.userId)
  return orderSample
}