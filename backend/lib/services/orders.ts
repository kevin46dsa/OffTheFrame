import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as path from 'path'
import { Construct } from 'constructs'

export function createOrdersService(
  scope: Construct,
) {
  const fn = new NodejsFunction(scope, 'OrdersLambda', {
    runtime: lambda.Runtime.NODEJS_18_X,
    entry: path.join(__dirname, '../../lambda/orders.ts'),
    handler: 'handler',
  })

  return fn
}
