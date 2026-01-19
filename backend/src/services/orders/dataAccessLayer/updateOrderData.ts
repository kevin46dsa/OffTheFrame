import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../../../database/dynamo-client'
import type { Order } from '../models'

const TABLE_NAME = process.env.ORDERS_TABLE!

export async function updateOrderDynamoDb(order: Order): Promise<void> {
  await ddb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: order,
    })
  )
}
