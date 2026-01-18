import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { createUserAnalyticsMetricsTable,createUserAnalyticsEventsTable } from './dynamodbTables'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export type DynamoResources = {
  userAnalyticsMetrics: dynamodb.Table
  userAnalyticsEvents: dynamodb.Table
  bindDynamoPermission(fn: lambda.Function): void
}

export function initDynamo(scope: Construct): DynamoResources {
  const userAnalyticsMetrics = createUserAnalyticsMetricsTable(scope)
  const userAnalyticsEvents = createUserAnalyticsEventsTable(scope)

  function bindDynamoPermission(fn: lambda.Function) {
    // env vars
    fn.addEnvironment(
      'USER_ANALYTICS_METRICS_TABLE',
      userAnalyticsMetrics.tableName
    )

    // IAM
    userAnalyticsMetrics.grantReadWriteData(fn)
  }


  return {
    userAnalyticsMetrics,
    userAnalyticsEvents,
    bindDynamoPermission,
  }
}
