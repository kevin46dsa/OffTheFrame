import { Grid } from '@mui/material'
import type { ProductGridProps } from '../../../types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) return null

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
      {products.map(product => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
