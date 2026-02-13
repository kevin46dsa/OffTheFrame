import {
  Container,
  Paper,
  Typography,
  Stack,
  Box,
  Button,
} from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import { useNavigate } from 'react-router-dom'

export function PurchaseCompleteNotFound() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: { xs: 5, sm: 8 } }}>
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            textAlign: 'center',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(245,242,237,0.9))',
            boxShadow: '0 18px 45px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 650 }}>
              Order not found
            </Typography>

            <Typography color="text.secondary">
              We couldn’t find this order. The link may have expired or the order ID is invalid.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ width: '100%', pt: 1 }}
            >

              <Button
                variant="text"
                fullWidth
                startIcon={<HomeRoundedIcon />}
                onClick={() => navigate('/')}
                sx={{
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Home
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}