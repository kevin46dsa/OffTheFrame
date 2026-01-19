import { useState } from 'react'
import { Container, Grid, Box, Typography } from '@mui/material'
import { OrderInfo, OrderDetails, PurchaseComplete } from '../components'

export default function Checkout() {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [orderInfo, setOrderInfo] = useState({
    email: '',
    promoCode: '',
  })

  if (isOrderConfirmed) {
    return <PurchaseComplete />
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* Left: Order Info */}
          <Grid >
            <OrderInfo
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
              setIsOrderConfirmed={setIsOrderConfirmed}
            />
          </Grid>

          {/* Right: Order Summary */}
          <Grid >
            <OrderDetails />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
