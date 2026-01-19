import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import {
  createUserAnalyticsMetricsTable,
  createUserAnalyticsEventsTable,
  createProductsTable,
  createOrdersTable,
} from './dynamodbTables'

export type DynamoResources = {
  bindProductsPermissions(fn: lambda.Function): void
  bindOrdersPermissions(fn: lambda.Function): void
}

export function initDynamo(scope: Construct): DynamoResources {
  const userAnalyticsMetrics = createUserAnalyticsMetricsTable(scope)
  const userAnalyticsEvents = createUserAnalyticsEventsTable(scope)
  const products = createProductsTable(scope)
  const orders = createOrdersTable(scope)

  function bindProductsPermissions(fn: lambda.Function) {
    fn.addEnvironment('PRODUCTS_TABLE', products.tableName)

    products.grantReadData(fn)
  }

  function bindOrdersPermissions(fn: lambda.Function) {
    fn.addEnvironment('ORDERS_TABLE', orders.tableName)

    orders.grantReadWriteData(fn)
  }

  return {
    bindProductsPermissions,
    bindOrdersPermissions,
  }
}
