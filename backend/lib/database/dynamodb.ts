import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { createUserAnalyticsMetricsTable,createUserAnalyticsEventsTable, createProductsTable } from './dynamodbTables'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export type DynamoResources = {
  userAnalyticsMetrics: dynamodb.Table
  userAnalyticsEvents: dynamodb.Table
  bindDynamoPermission(fn: lambda.Function): void
}

export function initDynamo(scope: Construct): DynamoResources {
  const userAnalyticsMetrics = createUserAnalyticsMetricsTable(scope)
  const userAnalyticsEvents = createUserAnalyticsEventsTable(scope)
  const products = createProductsTable(scope)


  function bindDynamoPermission(fn: lambda.Function) {
    fn.addEnvironment(
      'USER_ANALYTICS_METRICS_TABLE',
      userAnalyticsMetrics.tableName
    )

    fn.addEnvironment('PRODUCTS_TABLE', products.tableName)
    
   
    // IAM
    userAnalyticsMetrics.grantReadWriteData(fn)
    products.grantReadData(fn)
  }


  return {
    userAnalyticsMetrics,
    userAnalyticsEvents,
    bindDynamoPermission,
  }
}
