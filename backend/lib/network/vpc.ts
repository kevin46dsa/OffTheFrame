import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'

export function createVpc(scope: Construct) {
  return new ec2.Vpc(scope, 'OffTheFrameVpc', {
    maxAzs: 2,
    natGateways: 0,
  })
}
