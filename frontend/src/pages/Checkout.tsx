import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Box, Typography } from '@mui/material'
import { OrderInfo, OrderDetails } from '../components'
import { useOrder } from '../service/order/useOrder'

export default function Checkout() {
  const { order, complete, isLoading} = useOrder()
  const navigate = useNavigate()

  const [orderInfo, setOrderInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  if (isLoading) {
    return <div>Loading order…</div>
  }

  async function handlePlaceOrder() {
    if(!order)return null 
    const completedId = await complete({
      ...orderInfo,
    })
    navigate(`/order/complete/${completedId}`)
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
              onSubmit={handlePlaceOrder}
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
