import type { CartState, CartAction } from '../../types/cartTypes'

export const initialCartState: CartState = {
  items: []
}

export function addItemToCart(
  state: CartState,
  action: Extract<CartAction, { type: 'ADD_ITEM' }>
): CartState {
  const existingItem = state.items.find(
    item => item.product.id === action.payload.id
  )

  if (existingItem) {
    const nextState = {
      ...state,
      items: state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
    return nextState
  }

  const nextState = {
    ...state,
    items: [...state.items, { product: action.payload, quantity: 1 }]
  }
  return nextState
}

export function removeItemFromCart(
  state: CartState,
  action: Extract<CartAction, { type: 'REMOVE_ITEM' }>
): CartState {

  const existingItem = state.items.find(
    item => item.product.id === action.payload
  )

  if (!existingItem) {
    return state
  }

  if (existingItem.quantity === 1) {

    const nextState = {
      ...state,
      items: state.items.filter(
        item => item.product.id !== action.payload
      )
    }
    return nextState
  }
  const nextState = {
    ...state,
    items: state.items.map(item =>
      item.product.id === action.payload
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  }

  return nextState
}

export function clearCart(): CartState {
  return { ...initialCartState }
}

export function hydrateCart(
    state: CartState,
    action: Extract<CartAction, { type: 'HYDRATE_CART' }>
  ): CartState {
    return {
      ...state,
      items: action.payload,
    }
  }

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  const nextState = (() => {
    switch (action.type) {
      case 'ADD_ITEM':
        return addItemToCart(state, action)
      case 'REMOVE_ITEM':
        return removeItemFromCart(state, action)
      case 'HYDRATE_CART':
        return hydrateCart(state, action)
      case 'CLEAR_CART':
        return clearCart()

      default:
        console.warn('[CART] Unknown action type')
        return state
    }
  })()

  return nextState
}
