import {
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material'
import type { OrderInfoProps } from '../../types'

export function OrderInfo({
  orderInfo,
  setOrderInfo,
  onSubmit,
}: OrderInfoProps) {
  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <TextField
          label="First Name"
          fullWidth
          value={orderInfo.firstName ?? ''}
          onChange={(e) =>
            setOrderInfo({ ...orderInfo, firstName: e.target.value })
          }
        />

        <TextField
          label="Last Name"
          fullWidth
          value={orderInfo.lastName ?? ''}
          onChange={(e) =>
            setOrderInfo({ ...orderInfo, lastName: e.target.value })
          }
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={orderInfo.email ?? ''}
          onChange={(e) =>
            setOrderInfo({ ...orderInfo, email: e.target.value })
          }
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
