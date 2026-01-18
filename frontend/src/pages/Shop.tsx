import { Container, Typography, Box } from '@mui/material'
import { AllProducts } from '../components/Shop'

export default function Shop() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" gutterBottom>
          Shop
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Original works and limited edition prints
        </Typography>

        <AllProducts />
      </Box>
    </Container>
  )
}
