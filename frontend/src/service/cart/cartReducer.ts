import type { CartState, CartAction } from '../../types/cartTypes'

export const initialCartState: CartState = {
    items: []
  }

export function addItemToCart(state: CartState, action: Extract<CartAction, { type: 'ADD_ITEM' }>): CartState {
    const existingItem = state.items.find(item => item.product.id === action.payload.id)
    if (existingItem) {
        // If the item already exists, increment the quantity
        return { ...state, items: state.items.map(item => item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item) }
    }
    // If the item does not exist, add it to the cart with a quantity of 1
    return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] }
}

export function removeItemFromCart(state: CartState, action: Extract<CartAction, { type: 'REMOVE_ITEM' }>): CartState {
    const existingItem = state.items.find(item => item.product.id === action.payload)
    if (existingItem) {
        if (existingItem.quantity === 1) {
            // If the item quantity is 1, remove it from the cart
            return { ...state, items: state.items.filter(item => item.product.id !== action.payload) }
        } else {
            // If the item quantity is greater than 1, decrement the quantity
            return { ...state, items: state.items.map(item => item.product.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item) }
        }
    }
    // If the item does not exist, return the state unchanged
    return state
}

export function clearCart(): CartState {   
    return { ...initialCartState }
}

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            return addItemToCart(state, action)
        case 'REMOVE_ITEM':
            return removeItemFromCart(state, action)
        case 'CLEAR_CART':
            return clearCart()
        default:
            return state
    }
}