import { Product } from '../models'
import { getAllProductsDynamoDb } from '../dataAccessLayer'

export async function getAllProducts(): Promise<Product[]> {
  return getAllProductsDynamoDb()
}
