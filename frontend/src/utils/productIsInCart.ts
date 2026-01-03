import type { CartItem } from "../types/cartTypes"

export function productIsInCart(items: CartItem[], productId: string) {
    return items.some(item => item.product.id === productId)
}