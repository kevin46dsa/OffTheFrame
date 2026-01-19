import type { OrderDbItem } from '../models'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../../../database/dynamo-client'

const TABLE_NAME = process.env.ORDERS_TABLE!

export async function getActiveOrderDynamoDb(
    anonUserId: string
  ): Promise<OrderDbItem | null> {
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
        Limit: 1,
      })
    )
  
    return (res.Items?.[0] as OrderDbItem) ?? null
  }
  