import {
  Container,
  Paper,
  Typography,
  Stack,
  Box,
  CircularProgress,
} from '@mui/material'

export function PurchaseCompleteLoading() {
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
            <CircularProgress size={36} />

            <Typography variant="h5" sx={{ fontWeight: 650 }}>
              Preparing your downloads…
            </Typography>

            <Typography color="text.secondary">
              Please wait while we retrieve your order.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}