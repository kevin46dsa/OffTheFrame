import { Product } from '../models'

// TODO: Replace with actual data from the database
const products: Product[] = [
  { id: 'p1', title: 'Abstract Lines', price: 40, category: 'abstract' },
]

export async function getAllProductsData(): Promise<Product[]> {
  return products
}