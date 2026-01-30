import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({})

export async function getProductAssetUrlS3(assetKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.PRODUCTS_BUCKET!,
    Key: assetKey,
    ResponseContentDisposition: 'attachment',
  })

  return getSignedUrl(s3, command, {
    expiresIn: 300, // seconds
  })
}