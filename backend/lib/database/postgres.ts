import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as rds from 'aws-cdk-lib/aws-rds'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

export function createPostgres(scope: Construct, vpc: ec2.Vpc) {
  const credentials = new secretsmanager.Secret(scope, 'DbCredentials', {
    generateSecretString: {
      secretStringTemplate: JSON.stringify({
        username: 'offtheframe_admin',
      }),
      generateStringKey: 'password',
      excludePunctuation: true,
    },
  })

  const securityGroup = new ec2.SecurityGroup(scope, 'DbSecurityGroup', {
    vpc,
  })

  const db = new rds.DatabaseInstance(scope, 'OffTheFrameDb', {
    engine: rds.DatabaseInstanceEngine.postgres({
      version: rds.PostgresEngineVersion.VER_15,
    }),
    vpc,
    credentials: rds.Credentials.fromSecret(credentials),
    instanceType: ec2.InstanceType.of(
      ec2.InstanceClass.T4G,
      ec2.InstanceSize.MICRO
    ),
    databaseName: 'offtheframe',
    allocatedStorage: 20,
    securityGroups: [securityGroup],
    publiclyAccessible: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  })

  return {
    db,
    credentials,
    securityGroup,
  }
}
