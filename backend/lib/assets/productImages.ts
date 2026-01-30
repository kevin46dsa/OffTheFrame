import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

export function initProductsAssets(scope: Construct) {

  const bucket = new s3.Bucket(scope, 'ProductsBucket', {
    bucketName: 'off-the-frame-assets',
    encryption: s3.BucketEncryption.S3_MANAGED,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  
    // ✅ Allow bucket policy-based public access
    blockPublicAccess: new s3.BlockPublicAccess({
      blockPublicAcls: true,
      ignorePublicAcls: true,
      blockPublicPolicy: false, // 👈 THIS IS THE FIX
      restrictPublicBuckets: false,
    }),
  })

  // ✅ Public thumbnails ONLY
  bucket.addToResourcePolicy(
    new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${bucket.bucketArn}/thumbnails/*`],
      principals: [new iam.AnyPrincipal()],
    })
  )

  return bucket
}
