import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
} from '@aws-sdk/lib-dynamodb'
import { Product } from '../models'

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
const TABLE_NAME = process.env.PRODUCTS_TABLE!

export async function getProductByIdDynamoDb(
  productId: string
): Promise<Product|undefined> {
  const res = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `PRODUCT`,
        sk: `${productId}`,
      },
    })
  )

  return res.Item ? (res.Item as Product) : undefined
}