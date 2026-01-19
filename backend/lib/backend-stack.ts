import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {initDynamo } from './database'
import { createProductsService } from './services/products'
import { createOrdersService } from './services/orders'
import { createApiGateway } from './api/api-gateway'

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Initialize DynamoDB
    const dynamo = initDynamo(this)

    // Initialize Lambda instances
    const productsLambda = createProductsService(this)
    const ordersLambda = createOrdersService(this)

    dynamo.bindDynamoPermission(productsLambda)
    dynamo.bindDynamoPermission(ordersLambda)


    createApiGateway(this, {
      productsLambda,
      ordersLambda,
    })

  }
}
