import type { purchaseCompleteResponse } from '../../types'

const API = import.meta.env.VITE_API_URL

export async function getActiveOrder(userId: string) {
  const res = await fetch(`${API}/orders/active?userId=${userId}`)
  if (res.status === 404) return null
  return res.json()
}

export async function createOrder(body: {
  anonUserId: string
  sessionId: string
}) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function checkoutOrder(body: {
  orderId: string
  anonUserId: string
  sessionId: string
  items: any[]
}) {
  const res = await fetch(
    `${API}/orders/${body.orderId}/checkout`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )

  return res.json()
}

export async function completeOrder(body: {
  orderId: string
  anonUserId: string
  email?: string
  firstName?:string
  lastName?:string
}) {
  const res = await fetch(
    `${API}/orders/${body.orderId}/complete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    throw new Error('Failed to complete order')
  }

  return res.json()
}

export async function getCompletedOrder(
  userId: string,
  orderId: string
): Promise< purchaseCompleteResponse| null> {
  const res = await fetch(   `${API}/orders/${orderId}?userId=${userId}`)

  if (!res.ok) return null
  return res.json()
}


