import { Order } from '../models'
import { getOrderByIdData } from '../dataAccessLayer'

export async function getOrderById(id: string): Promise<Order> {
  return await getOrderByIdData(id)
}