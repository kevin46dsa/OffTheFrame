import { Paper, Stack, Typography, TextField, Button, Divider, Box } from '@mui/material'
import type { OrderInfoProps } from '../../types'

export function OrderInfo({ orderInfo, setOrderInfo, onSubmit }: OrderInfoProps) {
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
        Contact information
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        We’ll use this to send your receipt and updates.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2.25}>
        <TextField
          label="First name"
          fullWidth
          value={orderInfo.firstName ?? ''}
          onChange={(e) => setOrderInfo({ ...orderInfo, firstName: e.target.value })}
          autoComplete="given-name"
        />

        <TextField
          label="Last name"
          fullWidth
          value={orderInfo.lastName ?? ''}
          onChange={(e) => setOrderInfo({ ...orderInfo, lastName: e.target.value })}
          autoComplete="family-name"
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={orderInfo.email ?? ''}
          onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })}
          autoComplete="email"
        />

        <Box sx={{ pt: 0.5 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onSubmit}
            sx={{
              borderRadius: 999,
              py: 1.3,
              boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
            }}
          >
            Place order
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
