import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../../../database/dynamo-client'
import { Product } from '../models'

const TABLE_NAME = process.env.PRODUCTS_TABLE!

export async function getProductByIdDynamoDb(
  productId: string
): Promise<Product|undefined> {
  const res = await ddb.send(
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