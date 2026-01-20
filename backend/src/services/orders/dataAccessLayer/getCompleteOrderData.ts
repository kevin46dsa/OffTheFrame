import type { Order } from '../models'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../../../database/dynamo-client'

const TABLE_NAME = process.env.ORDERS_TABLE!

export async function getCompletedOrderItemsDynamoDb(
  anonUserId: string,
  orderId: string
): Promise<Order['items'] | null> {
  const res = await ddb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pk = :pk AND sk = :sk',
      ProjectionExpression: '#items, #status',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#items': 'items',
      },
      ExpressionAttributeValues: {
        ':pk': anonUserId,
        ':sk': orderId,
      },
      Limit: 1,
    })
  )

  const order = res.Items?.[0] as
    | Pick<Order, 'items' | 'status'>
    | undefined

  if (!order) {
    return null
  }

  // 🔒 HARD GUARANTEE
  if (order.status !== 'COMPLETED') {
    throw new Error(
      `Order ${orderId} is not completed (status=${order.status})`
    )
  }

  return order.items
}
