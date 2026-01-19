import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box, CircularProgress } from '@mui/material'
import { getProductById } from '../data/url'
import type { Product } from '../types'
import { ProductInfo, ProductMedia, ProductActions } from '../components/Product'
import { ProductNotFound } from '../components/NotFound'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async()=>{
    if(!id) return
    try {
      const res = await fetch(getProductById(id))
      if (!res.ok) {
        setProduct(null)
        return
      }
      const data: Product = await res.json()
      setProduct(data)
    } catch (err) {
      console.error('Failed to fetch product', err)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  },[id])


  useEffect(() => {
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!product) {
    return <ProductNotFound />
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* Media */}
          <Grid>
            <ProductMedia productData={product} />
          </Grid>

          {/* Info + Actions */}
          <Grid>
            <ProductInfo productData={product} />
            <Box sx={{ mt: 4 }}>
              <ProductActions productData={product} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
