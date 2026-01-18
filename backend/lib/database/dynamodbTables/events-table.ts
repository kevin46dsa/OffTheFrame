import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { RemovalPolicy } from 'aws-cdk-lib'

export function createUserAnalyticsEventsTable(scope: Construct) {
  return new dynamodb.Table(scope, 'UserAnalyticsEvents', {
    partitionKey: {
      name: 'pk',
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: {
      name: 'sk',
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    timeToLiveAttribute: 'ttl',
    removalPolicy: RemovalPolicy.DESTROY,
  })
}
