import { Product } from '../models'
import { getAllProductsData } from '../dataAccessLayer'

export async function getAllProducts(): Promise<Product[]> {
  return getAllProductsData()
}
