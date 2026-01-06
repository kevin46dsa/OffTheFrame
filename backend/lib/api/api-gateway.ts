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
  })

  const products = api.root.addResource('products')
  products.addMethod('GET', new apigateway.LambdaIntegration(productsLambda))
  products.addResource('{id}').addMethod(
    'GET',
    new apigateway.LambdaIntegration(productsLambda)
  )

  const orders = api.root.addResource('orders')
  orders.addMethod('POST', new apigateway.LambdaIntegration(ordersLambda))
  orders.addMethod('GET', new apigateway.LambdaIntegration(ordersLambda))

  orders.addResource('active').addMethod(
    'GET',
    new apigateway.LambdaIntegration(ordersLambda)
  )
}
