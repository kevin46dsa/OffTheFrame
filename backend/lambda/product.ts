import { ok, notFound, serverError } from '../src/http/response'
import { productService } from '../src/services'

export async function handler(event: any) {
  try {
    const method = event.httpMethod
    const productId = event.pathParameters?.id

    // GET /products
    if (method === 'GET' && !productId) {
      const products = await productService.getAllProducts()
      return ok(products)
    }

    // GET /products/{id}
    if (method === 'GET' && productId) {
      const product = await productService.getProductById(productId)

      if (!product) {
        return notFound('Product not found')
      }

      return ok(product)
    }

    return notFound('Route not found')
  } catch (error) {
    console.error('[ProductsLambda]', error)
    return serverError()
  }
}
