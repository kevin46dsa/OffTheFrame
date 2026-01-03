import type { CartState, CartAction } from '../../types/cartTypes'

export const initialCartState: CartState = {
  items: []
}

export function addItemToCart(
  state: CartState,
  action: Extract<CartAction, { type: 'ADD_ITEM' }>
): CartState {
  console.group('[CART] ADD_ITEM')
  console.log('Incoming product:', action.payload)
  console.log('Current state:', state)

  const existingItem = state.items.find(
    item => item.product.id === action.payload.id
  )

  if (existingItem) {
    console.log('Item exists → incrementing quantity')

    const nextState = {
      ...state,
      items: state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    console.log('Next state:', nextState)
    console.groupEnd()
    return nextState
  }

  console.log('Item does not exist → adding new item')

  const nextState = {
    ...state,
    items: [...state.items, { product: action.payload, quantity: 1 }]
  }

  console.log('Next state:', nextState)
  console.groupEnd()
  return nextState
}

export function removeItemFromCart(
  state: CartState,
  action: Extract<CartAction, { type: 'REMOVE_ITEM' }>
): CartState {
  console.group('[CART] REMOVE_ITEM')
  console.log('Product ID:', action.payload)
  console.log('Current state:', state)

  const existingItem = state.items.find(
    item => item.product.id === action.payload
  )

  if (!existingItem) {
    console.log('Item not found → no-op')
    console.groupEnd()
    return state
  }

  if (existingItem.quantity === 1) {
    console.log('Quantity is 1 → removing item')

    const nextState = {
      ...state,
      items: state.items.filter(
        item => item.product.id !== action.payload
      )
    }

    console.log('Next state:', nextState)
    console.groupEnd()
    return nextState
  }

  console.log('Quantity > 1 → decrementing quantity')

  const nextState = {
    ...state,
    items: state.items.map(item =>
      item.product.id === action.payload
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  }

  console.log('Next state:', nextState)
  console.groupEnd()
  return nextState
}

export function clearCart(): CartState {
  console.group('[CART] CLEAR_CART')
  console.log('Resetting cart to initial state')
  console.log('Initial state:', initialCartState)
  console.groupEnd()

  return { ...initialCartState }
}

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  console.group('[CART] ACTION DISPATCHED')
  console.log('Action:', action)
  console.log('State before:', state)

  const nextState = (() => {
    switch (action.type) {
      case 'ADD_ITEM':
        return addItemToCart(state, action)
      case 'REMOVE_ITEM':
        return removeItemFromCart(state, action)
      case 'CLEAR_CART':
        return clearCart()
      default:
        console.warn('[CART] Unknown action type')
        return state
    }
  })()

  console.log('State after:', nextState)
  console.groupEnd()

  return nextState
}
