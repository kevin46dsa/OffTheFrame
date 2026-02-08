import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Box, CircularProgress, Divider } from '@mui/material'
import { Grid } from '@mui/material'
import { fetchProductById } from '../service/product/productApi'
import type { Product } from '../types'
import { ProductInfo, ProductMedia, ProductActions } from '../components/Product'
import { ProductNotFound } from '../components/NotFound'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!product) return <ProductNotFound />

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-start">
          {/* Media */}
          <Grid size={{ xs: 12, md: 8 }}>
            <ProductMedia productData={product} />
          </Grid>

          {/* Info + Actions */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              // breathing room on mobile so text doesn't feel jammed
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
  )
}
