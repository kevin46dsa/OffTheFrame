import { Product } from '../models'
import { getProductByIdData } from '../dataAccessLayer'

export async function getProductById(id: string): Promise<Product> {
  return getProductByIdData(id)
}
