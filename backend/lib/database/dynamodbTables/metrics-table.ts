import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { RemovalPolicy } from 'aws-cdk-lib'

export function createUserAnalyticsMetricsTable(scope: Construct) {
  return new dynamodb.Table(scope, 'UserAnalyticsMetrics', {
    partitionKey: {
      name: 'pk',
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: {
      name: 'sk',
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    removalPolicy: RemovalPolicy.DESTROY, // portfolio-safe
  })
}
