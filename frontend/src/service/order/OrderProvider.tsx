// src/service/order/OrderProvider.tsx
import { useEffect, useState, useCallback, useContext } from 'react'
import { OrderContext } from './orderContext'
import { CartContext } from '../cart/cartContext'
import { createOrder, getActiveOrder, checkoutOrder, completeOrder } from './orderApi'
import { useAnalyticsIdentity } from '../../hooks'

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { anonUserId, sessionId, isReady } = useAnalyticsIdentity()

  const cartContext = useContext(CartContext)
  if (!cartContext) {
    throw new Error('OrderProvider must be used within CartProvider')
  }

  const { dispatch } = cartContext

  const [cartHydrated, setCartHydrated] = useState(false)

  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const initOrder = useCallback(async () => {
    if (!anonUserId || !sessionId) return
  
    const active = await getActiveOrder(anonUserId)
  
    if (active) {
      setOrder(active)
      if (!cartHydrated && active.items?.length > 0) {
        dispatch({
          type: 'HYDRATE_CART',
          payload: active.items,
        })
        setCartHydrated(true)
      }
    } else {
      const created = await createOrder({
        anonUserId,
        sessionId,
      })
      setOrder(created)
    }
  
    setIsLoading(false)
  }, [anonUserId, sessionId, cartHydrated])
  
  // Ensure order on app load
  useEffect(() => {
    if (!isReady) return
    initOrder()
  }, [isReady])

  async function checkout(items: any[]) {
    if (!order || !anonUserId || !sessionId) return

    const updated = await checkoutOrder({
      orderId: order.orderId,
      anonUserId,
      sessionId,
      items,
    })

    setOrder(updated)
  }

  async function complete({
    email,
    firstName,
    lastName,
  }: {
    email?: string
    firstName?: string
    lastName?: string
  }) {
    if (!order || !anonUserId) return ''
  
    await completeOrder({
      orderId: order.orderId,
      anonUserId,
      email,
      firstName,
      lastName,
    })
  
    const completedId = order.orderId
  
    // 🔥 immediately reset ACTIVE order state
    startNewOrder()
    
  
    return completedId
  }



  async function startNewOrder() {
    if (!anonUserId || !sessionId) return
  
    const created = await createOrder({
      anonUserId,
      sessionId,
    })
  
    setOrder(created)
    setCartHydrated(false)
    dispatch({ type: 'CLEAR_CART' })
  }
  


  return (
    <OrderContext.Provider value={{ order, isLoading, checkout , complete}}>
      {children}
    </OrderContext.Provider>
  )
}