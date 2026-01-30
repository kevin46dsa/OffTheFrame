import { getProductAssetUrl } from '../../products/Bll'
import { getCompletedOrderItemsDynamoDb } from '../dataAccessLayer'

export async function getCompleteOrder(userId: string, orderId: string) {
  const items = await getCompletedOrderItemsDynamoDb(userId, orderId)
  if (!items) return null

  const signedUrls = await Promise.all(
    items.map((item) => getProductAssetUrl(item.product.images.download))
  )

  return items.map((item, i) => ({
    productId: item.product.id,
    title: item.product.title,
    quantity: item.quantity,
    downloadUrl: signedUrls[i], 
  }))
}
