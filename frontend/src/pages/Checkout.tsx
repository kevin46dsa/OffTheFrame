import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button, Stack } from '@mui/material'
import { Grid } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { OrderInfo, OrderDetails } from '../components'
import { useOrder } from '../service/order/useOrder'

export default function Checkout() {
  const { order, complete, isLoading } = useOrder()
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
    if (!order) return null
    const completedId = await complete({ ...orderInfo })
    navigate(`/order/complete/${completedId}`)
  }

  const handleContinueShopping = () => {
    // feels natural: go back if they came from Shop/Product, otherwise go to Shop
    if (window.history.length > 1) navigate(-1)
    else navigate('/shop')
  }

  return (
    <Box
      sx={{
        background:
          'radial-gradient(1200px 600px at 20% 0%, rgba(0,0,0,0.04), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(0,0,0,0.03), transparent 55%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
            sx={{ mb: { xs: 2, md: 3 } }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontSize: { xs: '2rem', md: '2.25rem' } }}>
                Checkout
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Complete your order in a few steps.
              </Typography>
            </Box>

            <Button
              startIcon={<ArrowBackRoundedIcon />}
              variant="text"
              color="inherit"
              onClick={handleContinueShopping}
              sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
            >
              Continue shopping
            </Button>
          </Stack>

          <Grid container spacing={{ xs: 2.5, md: 4 }} alignItems="flex-start">
            {/* Left: form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <OrderInfo
                orderInfo={orderInfo}
                setOrderInfo={setOrderInfo}
                onSubmit={handlePlaceOrder}
              />
            </Grid>

            {/* Right: summary (sticky on desktop) */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
                <OrderDetails />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
