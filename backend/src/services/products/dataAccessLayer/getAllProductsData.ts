import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb'
import { Product } from '../models'


const client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
const TABLE_NAME = process.env.PRODUCTS_TABLE!

export async function getAllProductsData(): Promise<Product[]> {
  const res = await client.send(
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


