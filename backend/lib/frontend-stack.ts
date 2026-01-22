import * as cdk from 'aws-cdk-lib'
import { Stack, StackProps, Duration, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    /**
     * -------------------------------------------------------------
     * 1️⃣ S3 bucket (PRIVATE)
     * -------------------------------------------------------------
     * - Stores built frontend files
     * - NOT publicly accessible
     */
    const siteBucket = new s3.Bucket(this, 'FrontendBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // never auto-delete prod assets
      autoDeleteObjects: false,
    })

    /**
     * -------------------------------------------------------------
     * 2️⃣ ACM Certificate (MUST be us-east-1 for CloudFront)
     * -------------------------------------------------------------
     */
    const certificate = new acm.Certificate(this, 'FrontendCert', {
      domainName: 'offtheframe.nosenterprise.org',
      validation: acm.CertificateValidation.fromDns(), // Cloudflare DNS manual step
    })


    /**
     * -------------------------------------------------------------
     * 4️⃣ CloudFront Distribution
     * -------------------------------------------------------------
     */
    const distribution = new cloudfront.Distribution(this, 'FrontendDistribution', {
      defaultRootObject: 'index.html',

      domainNames: ['offtheframe.nosenterprise.org'],
      certificate,

      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
      },

      /**
       * SPA support:
       * Redirect 403 / 404 to index.html
       */
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
      ],
    })


    /**
     * -------------------------------------------------------------
     * 5️⃣ Allow CloudFront to read from S3
     * -------------------------------------------------------------
     */
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [`${siteBucket.bucketArn}/*`],
            principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
            conditions: {
                StringEquals: {
                    'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
                },
            },
        })
)

    /**
     * -------------------------------------------------------------
     * 6️⃣ Deploy frontend build to S3
     * -------------------------------------------------------------
     */
    new s3deploy.BucketDeployment(this, 'FrontendDeploy', {
      sources: [s3deploy.Source.asset('../frontend/dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    })

    /**
     * -------------------------------------------------------------
     * 7️⃣ Outputs (for Cloudflare DNS)
     * -------------------------------------------------------------
     */
    new CfnOutput(this, 'CloudFrontDomain', {
      value: distribution.distributionDomainName,
    })
  }
}
