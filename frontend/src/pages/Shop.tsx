import { Container, Typography, Box } from '@mui/material'
import { AllProducts, ShopHero } from '../components/Shop'

export default function Shop() {
  return (
    <Box
      sx={{
        background:
          'radial-gradient(1200px 600px at 20% 0%, rgba(0,0,0,0.05), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(0,0,0,0.04), transparent 55%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          <ShopHero />

          <Box
  sx={{
    my: { xs: 4, md: 6 },
    mx: 'auto',
    width: { xs: 120, md: 160 },
    height: 10,
    borderRadius: 999,
    background: 'rgba(0,0,0,0.10)',
    filter: 'blur(0.2px)',
    boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
    opacity: 0.65,
  }}
/>

          {/* Anchor point for CTA scroll */}
          <Box id="shop" sx={{ pt: { xs: 4, md: 6 } }}>
            <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '2.1rem', md: '3rem' } }}>
              Shop
            </Typography>

            <Typography color="text.secondary" sx={{ mb: { xs: 3, md: 4 } }}>
              Original works and limited edition prints
            </Typography>

            <AllProducts />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
