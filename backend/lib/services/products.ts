import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as path from 'path'
import { Construct } from 'constructs'

export function createProductsService(
  scope: Construct,
) {
  const fn = new NodejsFunction(scope, 'ProductsLambda', {
    runtime: lambda.Runtime.NODEJS_18_X,
    entry: path.join(__dirname, '../../lambda/products.ts'),
    handler: 'handler',
  })

  return fn
}
