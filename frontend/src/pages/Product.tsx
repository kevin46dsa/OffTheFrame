import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Box,
  CircularProgress,
  Divider,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import { Grid } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

import { fetchProductById } from '../service/product/productApi'
import type { Product } from '../types'
import { ProductInfo, ProductMedia, ProductActions } from '../components/Product'
import { ProductNotFound } from '../components/NotFound'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      const p = await fetchProductById(id)
      setProduct(p ?? null)
    } catch {
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleBack = () => {
    // If they came from shop list, go back. Otherwise fallback to /shop.
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!product) return <ProductNotFound />

  return (
    <Box
      sx={{
        background:
          'radial-gradient(1200px 600px at 20% 0%, rgba(0,0,0,0.04), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(0,0,0,0.03), transparent 55%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          {/* Header row */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
            sx={{ mb: { xs: 2, md: 3 } }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: '2rem', md: '2.25rem' } }}
                noWrap
                title={product.title}
              >
                {product.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {product.artist}
              </Typography>
            </Box>

            <Button
              startIcon={<ArrowBackRoundedIcon />}
              variant="text"
              color="inherit"
              onClick={handleBack}
              sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
            >
              Back
            </Button>
          </Stack>

          {/* Content */}
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-start">
            {/* Media */}
            <Grid size={{ xs: 12, md: 8 }}>
              <ProductMedia productData={product} />
            </Grid>

            {/* Info + Actions */}
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                px: { xs: 0.5, md: 0 },
              }}
            >
              <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <ProductInfo productData={product} />
              </Box>

              <Divider sx={{ display: { xs: 'none', md: 'block' }, mb: 3 }} />

              <ProductActions productData={product} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
