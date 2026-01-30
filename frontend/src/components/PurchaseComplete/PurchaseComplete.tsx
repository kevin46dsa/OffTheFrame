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
  import { getCompletedOrder } from '../../service/order/orderApi'
  import { useAnalyticsIdentity } from '../../hooks'
import { useEffect, useState } from 'react'
import type { purchaseCompleteResponse } from '../../types'
import { useParams } from 'react-router-dom'
  
  
  export function PurchaseComplete() {
    const { orderId } = useParams<{ orderId: string }>()
    const { anonUserId } = useAnalyticsIdentity()
  
    const [items, setItems] = useState<purchaseCompleteResponse[] | null>(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if (!orderId || !anonUserId) return
  
      async function loadOrder() {
        if(!anonUserId || !orderId)return 
        try {
          const order = await getCompletedOrder(anonUserId, orderId)
          setItems(order ?? [])
        } finally {
          setLoading(false)
        }
      }
  
      loadOrder()
    }, [orderId, anonUserId])
  
    if (loading) return <div>Loading receipt…</div>
    if (!items || items.length === 0) return <div>No Order Found</div>
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
                    key={item.productId}
                    href={item.downloadUrl}
                    download
                    variant="outlined"
                    fullWidth
                  >
                    Download {item.title}
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
  