import { ddb } from '../../../database/dynamo-client'
import {
  QueryCommand,
} from '@aws-sdk/lib-dynamodb'
import { Product } from '../models'

const TABLE_NAME = process.env.PRODUCTS_TABLE!

export async function getAllProductsDynamoDb(): Promise<Product[]> {
  const res = await ddb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': 'PRODUCT',
      },
    })
  )

  return (res.Items ?? []) as Product[]
}


