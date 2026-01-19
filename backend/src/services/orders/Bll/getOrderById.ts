import { Order } from '../models'
import { getOrderByIdDynamoDb } from '../dataAccessLayer'

export async function getOrderById(userId: string, orderId:string): Promise<Order|undefined> {
  return await getOrderByIdDynamoDb(userId,orderId)
}