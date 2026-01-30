import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {initDynamo } from './database'
import { initProductsAssets } from './assets'
import { createProductsService } from './services/products'
import { createOrdersService } from './services/orders'
import { createApiGateway } from './api/api-gateway'

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Initialize DynamoDB
    const dynamo = initDynamo(this)

        // S3 init product assets
        const productsBucket = initProductsAssets(this)

    // Initialize Lambda instances
    const productsLambda = createProductsService(this)
    const ordersLambda = createOrdersService(this)

    dynamo.bindProductsPermissions(productsLambda)
    dynamo.bindOrdersPermissions(ordersLambda)

    productsBucket.grantRead(ordersLambda)

    // Env vars
    ordersLambda.addEnvironment(
      'PRODUCTS_BUCKET',
      productsBucket.bucketName
    )


    createApiGateway(this, {
      productsLambda,
      ordersLambda,
    })

     


  }
}
