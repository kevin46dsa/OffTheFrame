import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useCart } from '../../service/cart/useCart'
import { useCartUi } from '../../service/cart/cartUiContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function CartSidebar() {
  const { items, addItem, removeItem, clearCart } = useCart()
  const { isOpen, closeCart, openCart } = useCartUi()
  const navigate = useNavigate()

  // Auto-open cart when first item is added
  useEffect(() => {
    if (items.length > 0) {
      openCart
    }
  }, [items.length])

  const handleCheckout = () => {
    closeCart
    navigate('/checkout')
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
    >
      <Box
        sx={{
          width: 360,
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h6">Cart</Typography>
          <IconButton onClick={closeCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Empty state */}
        {items.length === 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography color="text.secondary">
              Your cart is empty
            </Typography>
          </Box>
        )}

        {/* Items */}
        <Stack spacing={2} sx={{ mt: 3, flexGrow: 1 }}>
          {items.map(item => (
            <Box key={item.product.id}>
              <Typography fontWeight={500}>
                {item.product.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                ${item.product.price}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => removeItem(item.product.id)}
                >
                  −
                </Button>

                <Typography>{item.quantity}</Typography>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => addItem(item.product)}
                >
                  +
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* Footer */}
        {items.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCheckout}
              >
                Checkout
              </Button>

              <Button
                variant="text"
                color="inherit"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Drawer>
  )
}
