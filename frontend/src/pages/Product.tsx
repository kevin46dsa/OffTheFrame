import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box } from '@mui/material'
import { products } from '../data/productData'
import { ProductInfo, ProductMedia, ProductActions } from '../components/Product'
import { ProductNotFound } from '../components/NotFound'

export default function Product() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)

  if (!product) {
    return <ProductNotFound />
  }

  useEffect(() => {
    console.log('Product page viewed', id)
  }, [id])

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* Media */}
          <Grid >
            <ProductMedia productData={product} />
          </Grid>

          {/* Info + Actions */}
          <Grid >
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
