// src/dao/ordersDao.ts
import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../../../database/dynamo-client'
import { Order } from '../models'

const TABLE_NAME = process.env.ORDERS_TABLE!

export async function getOrderByIdDynamoDb(
  anonUserId: string,
  orderId: string,
): Promise<Order | undefined> {
  const res = await ddb.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: anonUserId,
        sk: orderId,
      },
    })
  )

  return res.Item as Order | undefined
}
