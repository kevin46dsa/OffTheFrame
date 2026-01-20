import type { Product } from './productTypes'

export type CartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | {
    type: 'HYDRATE_CART'
    payload: CartItem[]
  }

