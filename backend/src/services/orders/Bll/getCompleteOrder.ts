import { Order} from '../models'
import { getCompletedOrderItemsDynamoDb} from '../dataAccessLayer'

export async function getCompleteOrder(
    userId: string,
    orderId:string
  ): Promise<Order['items']| null> {
    return await getCompletedOrderItemsDynamoDb(userId,orderId)
  }