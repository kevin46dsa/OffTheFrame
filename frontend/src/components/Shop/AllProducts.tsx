import { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { ProductGrid } from './Layout/ProductGrid'
import { fetchAllProducts } from '../../service/product/productApi'
import type { Product } from '../../types'

export function AllProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const allProducts = await fetchAllProducts()
        setProducts(allProducts ?? [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return <ProductGrid products={products} />
}
