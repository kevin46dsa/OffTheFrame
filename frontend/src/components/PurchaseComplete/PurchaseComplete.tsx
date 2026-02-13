import {
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  IconButton,
  Chip,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PurchaseCompleteLoading} from './PurchaseCompleteLoading'
 import { PurchaseCompleteNotFound } from './PurchaseCompleteNotFound'
import { getCompletedOrder } from '../../service/order/orderApi'
import { useAnalyticsIdentity } from '../../hooks'
import type { purchaseCompleteResponse } from '../../types'


const bucket = import.meta.env.VITE_PRODUCTS_BUCKET
const region = import.meta.env.VITE_AWS_REGION

const getImageUrl = (key?: string) =>
  key
    ? `https://${bucket}.s3.${region}.amazonaws.com/thumbnails/${key}/primary${key.substring(2)}.png`
    : 'https://via.placeholder.com/200x200'

export function PurchaseComplete() {
  const { orderId } = useParams<{ orderId: string }>()
  const { anonUserId } = useAnalyticsIdentity()
  const navigate = useNavigate()

  const [items, setItems] = useState<purchaseCompleteResponse[] | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
  if (!orderId || !anonUserId) return

  ;(async () => {
    try {
      setLoading(true)
      const order = await getCompletedOrder(anonUserId, orderId)
      setItems(Array.isArray(order) ? order : [])
    } catch (e) {
      console.error(e)
      setItems([])
    } finally {
      setLoading(false)
    }
  })()
}, [orderId, anonUserId])

  const count = items?.length ?? 0

  const subtitle = useMemo(() => {
    if (count === 1) return 'Your download is ready.'
    return 'Your downloads are ready.'
  }, [count])

if (loading) return <PurchaseCompleteLoading />
if (!items || items.length === 0) return <PurchaseCompleteNotFound />

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: { xs: 5, sm: 8 } }}>
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(245,242,237,0.9))',
            boxShadow: '0 18px 45px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '999px',
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(46, 125, 50, 0.10)',
              }}
            >
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 650 }}>
                Purchase complete
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            </Box>

            <Divider sx={{ width: '100%' }} />

            {/* Downloads list */}
            <Box sx={{ width: '100%', textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 650, mb: 1.5 }}>
                Your downloads
              </Typography>

              <Stack  spacing={1.25}
  sx={{
    maxHeight: '500px',
    overflowY: 'auto',
    pr: 0.5, // space for scrollbar
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain',
    // subtle scrollbar styling (optional)
    '&::-webkit-scrollbar': { width: 8 },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0.18)',
      borderRadius: 999,
    },
    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
  }} >
                {items.map(item => (
                  <Box
                    key={item.productId}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr 44px',
                      gap: 1.5,
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 3,
                      border: '1px solid rgba(0,0,0,0.08)',
                      background: 'rgba(255,255,255,0.65)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Thumbnail */}
                    <Box
                      component="img"
                      src={getImageUrl(item.productId)}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        // fallback to a subtle blank tile if thumb missing
                        const img = e.currentTarget
                        img.style.display = 'none'
                        const parent = img.parentElement
                        if (parent) parent.setAttribute('data-thumb-missing', 'true')
                      }}
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2,
                        objectFit: 'cover',
                        border: '1px solid rgba(0,0,0,0.06)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(240,235,228,0.9))',
                      }}
                    />

                    {/* If the img disappears, this gives you a nice empty tile */}
                    <Box
                      sx={{
                        display: 'none',
                        width: 52,
                        height: 52,
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.06)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(240,235,228,0.9))',
                      }}
                    />

                    {/* Title + meta */}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 650 }} noWrap title={item.title}>
                        {item.title}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.25 }}>
                        <Chip
                          label="PNG"
                          size="small"
                          sx={{
                            height: 22,
                            borderRadius: 999,
                            fontSize: 12,
                            backgroundColor: 'rgba(0,0,0,0.04)',
                          }}
                        />
                      </Stack>
                    </Box>

                    {/* Individual download */}
                    <IconButton
                      aria-label={`Download ${item.title}`}
                      href={item.downloadUrl}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.10)',
                        background: 'rgba(255,255,255,0.8)',
                        '&:hover': { background: 'rgba(255,255,255,1)' },
                      }}
                    >
                      <DownloadRoundedIcon />
                    </IconButton>
                  </Box>
                ))}
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Links expire after a short period. If a download fails, refresh this page and try again.
              </Typography>
            </Box>

            <Divider sx={{ width: '100%' }} />

            {/* Footer actions */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ width: '100%' }}
            >

              <Button
                variant="text"
                size="large"
                fullWidth
                startIcon={<HomeRoundedIcon />}
                onClick={() => navigate('/')}
                sx={{
                  borderRadius: 999,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 650,
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
