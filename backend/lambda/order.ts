import {
    ok,
    created,
    notFound,
    badRequest,
    serverError,
  } from '../src/http/response'
  import { orderService } from '../src/services'
  
  export async function handler(event: any) {
    try {
      const method = event.httpMethod
      const resource = event.resource
      const orderId = event.pathParameters?.id
  
      // placeholder until auth
      const userId = 'anonymous-user'
  
      // POST /orders
      if (method === 'POST' && resource === '/orders') {
        if (!event.body) {
            return badRequest('Request body required')
          }
    
        const { items } = JSON.parse(event.body)
        const order = await orderService.createOrder(items)
        return created(order)
      }
  
      /*
      // GET /orders
      if (method === 'GET' && resource === '/orders') {
        const orders = await orderService.getOrders(userId)
        return ok(orders)
      }
  
      // GET /orders/active
      if (method === 'GET' && resource === '/orders/active') {
        const order = await orderService.getActiveOrder(userId)
        return order ? ok(order) : notFound('No active order')
      }
  
      // PUT /orders/{id}
      if (method === 'PUT' && resource === '/orders/{id}') {
        if (!event.body) {
          return badRequest('Request body required')
        }
  
        const { items } = JSON.parse(event.body)
        const order = await orderService.updateOrder(
          userId,
          orderId,
          items
        )
  
        return ok(order)
      }
  
      // PUT /orders/{id}/complete
      if (method === 'PUT' && resource === '/orders/{id}/complete') {
        const order = await orderService.completeOrder(userId, orderId)
        return ok(order)
      }
        */
  
      return notFound('Route not found')
    } catch (error) {
      console.error('[OrdersLambda]', error)
      return serverError()
    }
  }
  