import {
  Paper,
  Typography,
  Stack,
  Divider,
  Box,
} from '@mui/material'
import { useOrder } from '../../service/order/useOrder'
import { useMemo } from 'react'

export function OrderDetails() {
  const { order } = useOrder()

  const items = order?.items ?? []

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  }, [items])

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
