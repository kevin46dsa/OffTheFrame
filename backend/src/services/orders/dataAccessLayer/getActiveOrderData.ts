import type { Order } from '../models'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../../../database/dynamo-client'

const TABLE_NAME = process.env.ORDERS_TABLE!

export async function getActiveOrderDynamoDb(
    anonUserId: string
  ): Promise<Order | null> {
    const res = await ddb.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        FilterExpression: '#status IN (:draft, :checkout)',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':pk': anonUserId,
          ':draft': 'DRAFT',
          ':checkout': 'CHECKOUT',
        },
      })
    )
  
    return (res.Items?.[0] as Order) ?? null
  }
  