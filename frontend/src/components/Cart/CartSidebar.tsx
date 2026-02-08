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
import { useOrder } from '../../service/order/useOrder'
import { useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom'

const bucket = import.meta.env.VITE_PRODUCTS_BUCKET
const region = import.meta.env.VITE_AWS_REGION

const getImageUrl = (key?: string) =>
  key
    ? `https://${bucket}.s3.${region}.amazonaws.com/${key}`
    : 'https://via.placeholder.com/200x200'

export function CartSidebar() {
  const { items, addItem, removeItem, clearCart } = useCart()
  const { isOpen, closeCart, openCart } = useCartUi()
  const { checkout } = useOrder()
  const navigate = useNavigate()

  // Auto-open cart when first item is added
  useEffect(() => {
    if (items.length > 0) openCart()
  }, [items.length])

  const handleCheckout = async () => {
    await checkout(items)
    closeCart()
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
  <Box key={item.product.id} sx={{ py: 1 }}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {/* Column 1: image */}
      <Box
        component="img"
        src={getImageUrl(item.product.images?.primary)}
        alt={item.product.title}
        loading="lazy"
        sx={{
          width: 72,
          height: 72,
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />

      {/* Column 2: text + controls */}
      <Box sx={{ minWidth: 0 }}>
        <Typography fontWeight={600} noWrap>
          {item.product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ${item.product.price}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            onClick={() => removeItem(item.product.id)}
            sx={{ minWidth: 40, px: 1.25 }}
          >
            −
          </Button>

          <Typography sx={{ width: 18, textAlign: 'center' }}>
            {item.quantity}
          </Typography>

          <Button
            size="small"
            variant="outlined"
            onClick={() => addItem(item.product)}
            sx={{ minWidth: 40, px: 1.25 }}
          >
            +
          </Button>
        </Stack>
      </Box>
    </Box>
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
