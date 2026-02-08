import { Paper, Typography, Stack, Divider, Box } from '@mui/material'
import { useOrder } from '../../service/order/useOrder'
import { useMemo } from 'react'

const bucket = import.meta.env.VITE_PRODUCTS_BUCKET
const region = import.meta.env.VITE_AWS_REGION

const getImageUrl = (key?: string) =>
  key ? `https://${bucket}.s3.${region}.amazonaws.com/${key}` : 'https://via.placeholder.com/200x200'

export function OrderDetails() {
  const { order } = useOrder()
  const items = order?.items ?? []

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [items])

  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(245,245,245,0.92), rgba(238,238,238,0.72))',
        boxShadow: '0 18px 60px rgba(0,0,0,0.06)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {items.map(item => (
          <Box
            key={item.product.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: '56px 1fr',
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={getImageUrl(item.product.images?.primary)}
              alt={item.product.title}
              loading="lazy"
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                objectFit: 'cover',
                boxShadow: 1,
              }}
            />

            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={600} noWrap>
                {item.product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.product.price} × {item.quantity}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography color="text.secondary">Subtotal</Typography>
        <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
      </Box>
    </Paper>
  )
}
