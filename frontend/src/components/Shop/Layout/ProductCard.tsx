import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../types'
import { ProductActions } from '../../Product/ProductActions'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardMedia
        component="img"
        height="320"
        image={product.images.primary ?? 'https://via.placeholder.com/600x800'}
        alt={product.title}
      />

      <CardContent>
        <Typography variant="h6">
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {product.artist}
        </Typography>

        <Typography variant="body1">
          ${product.price}
        </Typography>

        <Box sx={{ mt: 2 }} onClick={(e) => e.stopPropagation()}>
          <ProductActions productData={product} />
        </Box>
      </CardContent>
    </Card>
  )
}
