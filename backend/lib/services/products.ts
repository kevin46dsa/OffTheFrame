import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as path from 'path'
import { Construct } from 'constructs'

export function createProductsService(
  scope: Construct,
  vpc: ec2.Vpc,
  database: any
) {
  const fn = new NodejsFunction(scope, 'ProductsLambda', {
    runtime: lambda.Runtime.NODEJS_18_X,
    entry: path.join(__dirname, '../../lambda/products.ts'),
    handler: 'handler',
    vpc,
  })

  database.db.connections.allowFrom(fn, ec2.Port.tcp(5432))
  database.credentials.grantRead(fn)

  fn.addEnvironment('DB_HOST', database.db.dbInstanceEndpointAddress)
  fn.addEnvironment('DB_NAME', 'offtheframe')
  fn.addEnvironment('DB_SECRET_ARN', database.credentials.secretArn)

  return fn
}
