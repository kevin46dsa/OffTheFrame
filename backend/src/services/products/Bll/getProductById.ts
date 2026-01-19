import { Product } from '../models'
import { getProductByIdDynamoDb } from '../dataAccessLayer'

export async function getProductById(id: string): Promise<Product | undefined> {
  const response = getProductByIdDynamoDb(id)
  return response
}
