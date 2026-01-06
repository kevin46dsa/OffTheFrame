import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createVpc } from './network/vpc'
import { createPostgres } from './database/postgres'
import { createProductsService } from './services/products'
import { createOrdersService } from './services/orders'
import { createApiGateway } from './api/api-gateway'

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = createVpc(this)

    const database = createPostgres(this, vpc)

    const productsLambda = createProductsService(this, vpc, database)
    const ordersLambda = createOrdersService(this, vpc, database)

    createApiGateway(this, {
      productsLambda,
      ordersLambda,
    })
  }
}
