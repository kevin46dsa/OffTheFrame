import { Button, Stack, Typography } from '@mui/material'
import type { ProductActionsProps } from '../../types/productPageInterfaces'
import { trackEvent } from '../../utils'
import { useCart } from '../../service/cart/useCart'
import { useCallback } from 'react'

export function ProductActions({ productData }: ProductActionsProps) {
  const { items, addItem, removeItem } = useCart()

  const cartItem = items.find(
    item => item.product.id === productData.id
  )

  const addToCart = useCallback(() => {
    addItem(productData)
    trackEvent({ event: 'add_to_cart' })
  }, [addItem, productData])

  const removeFromCart = useCallback(() => {
    removeItem(productData.id)
    trackEvent({ event: 'remove_from_cart' })
  }, [removeItem, productData.id])

  const quantity = cartItem?.quantity ?? 0

  if (!cartItem) {
    return (
      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={addToCart}
      >
        Add to Cart
      </Button>
    )
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="outlined" onClick={removeFromCart}>
        −
      </Button>

      <Typography>{quantity}</Typography>

      <Button variant="outlined" onClick={addToCart}>
        +
      </Button>
    </Stack>
  )
}
