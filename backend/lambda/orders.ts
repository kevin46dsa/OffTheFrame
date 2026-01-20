import {
  ok,
  created,
  notFound,
  badRequest,
  serverError,
} from '../src/http/response'
import { orderService } from '../src/services'

export async function handler(event: any) {
  const { httpMethod, resource, pathParameters, queryStringParameters, body } =
    event

  // Placeholder until auth is added
  const userId = queryStringParameters?.userId 

  try {
    /**
     * POST /orders
     * Create order shell
     */
    if (httpMethod === 'POST' && resource === '/orders') {
      if (!body) {
        return badRequest('Request body required')
      }

      const { anonUserId, sessionId } = JSON.parse(body)

      const order = await orderService.createOrder({
        anonUserId,
        sessionId,
      })

      return created(order)
    }

    /**
     * GET /orders/active?userId=
     * Get active order for user
     */
    if (httpMethod === 'GET' && resource === '/orders/active') {
      const order = await orderService.getActiveOrder(userId)
      return order ? ok(order) : notFound('No active order')
    }

    /**
 * GET  /orders/{id}?userId=
 */
if (httpMethod === 'GET' && resource === '/orders/{id}') {
  const orderId = pathParameters?.id
  if (!orderId) {
    return badRequest('Order id required')
  }

  const orderItems = await orderService.getCompleteOrder(userId,orderId)

  return ok(orderItems)
}

/**
 * POST /orders/{id}/checkout
 */
if (httpMethod === 'POST' && resource === '/orders/{id}/checkout') {
  const orderId = pathParameters?.id
  if (!orderId || !body) {
    return badRequest('Order id and body required')
  }

  const { items,anonUserId } = JSON.parse(body)

  const order = await orderService.checkoutOrder({
    userId:anonUserId,
    orderId,
    items,
  })

  return ok(order)
}

 /**
 * POST /orders/{id}/complete
 */
if (httpMethod === 'POST' && resource === '/orders/{id}/complete') {
  const orderId = pathParameters?.id
  if (!orderId || !body) {
    return badRequest('Order id and body required')
  }

  const { anonUserId, email, firstName, lastName } = JSON.parse(body)

  const order = await orderService.completeOrder({
    userId:anonUserId,
    orderId,
    email,
    firstName,
    lastName
  })

  return ok(order)
}


    return notFound('Route not found')
  } catch (error) {
    console.error('[OrdersLambda]', {
      error,
      httpMethod,
      resource,
      pathParameters,
    })

    return serverError('Failed to process order')
  }
}
