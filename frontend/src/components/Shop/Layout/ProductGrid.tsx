import { Grid } from '@mui/material'
import type { ProductGridProps } from '../../../types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid
         container
         columnSpacing={6}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
