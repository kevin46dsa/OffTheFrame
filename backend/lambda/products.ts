import { ok, notFound, serverError } from '../src/http/response'
import { productService } from '../src/services'

export async function handler(event: any) {
  const { httpMethod, resource, pathParameters, path } = event

  try {
    if (httpMethod === 'GET'  && !pathParameters?.id) {
      return ok(await productService.getAllProducts())
    }

    if (httpMethod === 'GET' && pathParameters?.id) {
      const productId = pathParameters?.id

      if (!productId) {
        return notFound('Product id missing')
      }

      const product = await productService.getProductById(productId)

      if (!product) {
        return notFound(`Product ${productId} not found`)
      }

      return ok(product)
    }

    return notFound('Route not found')
  } catch (error) {
    console.error('[ProductsLambda]', {
      error,
      httpMethod,
      resource,
    })

    return serverError('Failed to fetch product data')
  }
}
