import { Order } from '../models'


const order: Order = {
  id: 'o1',
  userId: 'u1',
  items: [
    { id: 'p1', quantity: 1 },
  ],
  total: 100,
}


export async function getOrderByIdData(id: string): Promise<Order> {
  console.log('Getting order by id', id)
  return order
}