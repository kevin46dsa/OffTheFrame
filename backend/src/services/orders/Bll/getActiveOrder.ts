import { Order} from '../models'
import { getActiveOrderDynamoDb} from '../dataAccessLayer'

export async function getActiveOrder(
    userId: string
  ): Promise<Order | null> {
    return await getActiveOrderDynamoDb(userId)
  }