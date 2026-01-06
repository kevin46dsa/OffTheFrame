import { Product } from '../models'

// TODO: Replace with actual data from the database
const product: Product = { id: 'p1', title: 'Abstract Lines', price: 40, category: 'abstract' }


export async function getProductByIdData(id: string): Promise<Product> {
  console.log('Getting product by id', id)
  return product
}