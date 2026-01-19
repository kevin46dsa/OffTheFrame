import {
  Paper,
  Typography,
  Stack,
  Divider,
  Button,
  Box,
} from '@mui/material'
import { useCart } from '../../service/cart/useCart'

export function OrderDetails() {
  const { items, addItem, removeItem } = useCart()

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {items.map(item => (
          <Box key={item.product.id}>
            <Typography fontWeight={500}>
              {item.product.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              ${item.product.price} × {item.quantity}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => removeItem(item.product.id)}
              >
                −
              </Button>

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

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">
        Subtotal: ${subtotal.toFixed(2)}
      </Typography>
    </Paper>
  )
}
