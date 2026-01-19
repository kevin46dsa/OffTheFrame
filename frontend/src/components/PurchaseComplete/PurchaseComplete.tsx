import {
    Container,
    Paper,
    Typography,
    Stack,
    Button,
    Divider,
    Box,
  } from '@mui/material'
  import CheckCircleIcon from '@mui/icons-material/CheckCircle'
  import { useCart } from '../../service/cart/useCart'
  
  export function PurchaseComplete() {
    const { items } = useCart()
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8 }}>
          <Paper sx={{ p: 5 }}>
            <Stack spacing={3} alignItems="center" textAlign="center">
              <CheckCircleIcon
                color="success"
                sx={{ fontSize: 48 }}
              />
  
              <Typography variant="h4">
                Purchase Complete
              </Typography>
  
              <Typography color="text.secondary">
                Thank you for your order. Your digital downloads are ready
                and should begin automatically.
              </Typography>
  
              <Divider sx={{ width: '100%', my: 2 }} />
  
              <Typography variant="h6">
                Your Downloads
              </Typography>
  
              <Stack spacing={1} sx={{ width: '100%' }}>
                {items.map(item => (
                  <Button
                    key={item.product.id}
                    href={item.product.images.download}
                    download
                    variant="outlined"
                    fullWidth
                  >
                    Download {item.product.title}
                  </Button>
                ))}
              </Stack>
  
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                If your download does not begin automatically, use the
                buttons above. You may return to this page at any time.
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    )
  }
  