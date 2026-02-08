import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../types'
import { ProductActions } from '../../Product/ProductActions'

const bucket = import.meta.env.VITE_PRODUCTS_BUCKET
const region = import.meta.env.VITE_AWS_REGION

type ProductCardProps = {
  product: Product
}

const getImageUrl = (key?: string) =>
  key ? `https://${bucket}.s3.${region}.amazonaws.com/${key}` : 'https://via.placeholder.com/600x800'

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        cursor: 'pointer',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 2,
        transition: 'box-shadow 220ms ease, transform 220ms ease',

        '@media (hover: hover)': {
          '&:hover': {
            boxShadow: 8,
            transform: 'translateY(-4px)',
          },
          '&:hover .product-img': {
            transform: 'scale(1.03)',
          },
        },
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="320"
          image={getImageUrl(product.images.primary)}
          alt={product.title}
          className="product-img"
          sx={{
            transition: 'transform 220ms ease',
            transform: 'scale(1)',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {product.artist}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>

        <Box sx={{ mt: 2 }} onClick={(e) => e.stopPropagation()}>
          <ProductActions productData={product} />
        </Box>
      </CardContent>
    </Card>
  )
}
