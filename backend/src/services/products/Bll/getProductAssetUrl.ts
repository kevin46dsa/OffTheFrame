import { getProductAssetUrlS3 } from '../dataAccessLayer'

export async function getProductAssetUrl(key: string): Promise<string> {
  const response = getProductAssetUrlS3(key)
  return response
}