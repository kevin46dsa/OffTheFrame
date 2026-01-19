import {
    Paper,
    Stack,
    Typography,
    TextField,
    Button,
    Divider,
  } from '@mui/material'
  import type { OrderInfoProps } from '../../types'
  import { PROMO_CODE } from '../../data/promoCode'
  
  export function OrderInfo({
    orderInfo,
    setOrderInfo,
    setIsOrderConfirmed,
  }: OrderInfoProps) {
    const handleSubmit = () => {
      if (orderInfo.email && orderInfo.promoCode === PROMO_CODE) {
        setIsOrderConfirmed(true)
      }
    }
  
    return (
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
  
        <Divider sx={{ mb: 3 }} />
  
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={orderInfo.email}
            onChange={(e) =>
              setOrderInfo({ ...orderInfo, email: e.target.value })
            }
          />
  
          <TextField
            label="Promo Code"
            fullWidth
            value={orderInfo.promoCode}
            onChange={(e) =>
              setOrderInfo({ ...orderInfo, promoCode: e.target.value })
            }
            helperText="Optional"
          />
  
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Place Order
          </Button>
        </Stack>
      </Paper>
    )
  }
  