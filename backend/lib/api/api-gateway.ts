import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'

type ApiProps = {
  productsLambda: lambda.Function
  ordersLambda: lambda.Function
}

export function createApiGateway(
  scope: Construct,
  { productsLambda, ordersLambda }: ApiProps
) {
  const api = new apigateway.RestApi(scope, 'OffTheFrameApi', {
    restApiName: 'OffTheFrame API',
    defaultCorsPreflightOptions: {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: ['GET', 'POST', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
    },
  })

  /**
   * Routes for Products
   */
  const products = api.root.addResource('products')
  products.addMethod('GET', new apigateway.LambdaIntegration(productsLambda))
  products.addResource('{id}').addMethod(
    'GET',
    new apigateway.LambdaIntegration(productsLambda)
  )

  /**
   * Routes for Orders 
   */
  const orders = api.root.addResource('orders')
  // POST /orders
  orders.addMethod('POST', new apigateway.LambdaIntegration(ordersLambda))

  const ordersId = orders.addResource('{id}')
  // GET /orders/{id}
  ordersId.addMethod(
    'GET',
    new apigateway.LambdaIntegration(ordersLambda),
    {
      requestParameters: {
        'method.request.querystring.userId': true, // REQUIRED
        // set to false if optional
      },
    }
  )
  // POST /orders/{id}/complete
  ordersId.addResource('complete').addMethod('POST', new apigateway.LambdaIntegration(ordersLambda))
  // POST /orders/{id}/checkout
  ordersId.addResource('checkout').addMethod('POST', new apigateway.LambdaIntegration(ordersLambda))

  const activeOrders = orders.addResource('active')

  // GET /orders/active?userId=id
activeOrders.addMethod(
  'GET',
  new apigateway.LambdaIntegration(ordersLambda),
  {
    requestParameters: {
      'method.request.querystring.userId': true, // REQUIRED
      // set to false if optional
    },
  }
)
}
