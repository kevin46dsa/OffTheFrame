import { Box, Typography, Divider, Stack } from '@mui/material'
import type { ProductInfoProps } from '../../types/productPageInterfaces'

export function ProductInfo({ productData }: ProductInfoProps) {
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' }, lineHeight: 1.15 }}
      >
        {productData.title}
      </Typography>

      <Typography color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
        {productData.artist}
      </Typography>

      <Typography variant="h6" sx={{ mt: 1.5, fontSize: { xs: '1.15rem', md: '1.25rem' } }}>
        ${productData.price}
      </Typography>

      <Divider sx={{ my: { xs: 2, md: 3 } }} />

      <Typography variant="body1" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '0.98rem', md: '1rem' } }}>
        {productData.description}
      </Typography>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Category: {productData.category}
        </Typography>

        {Array.isArray(productData.keywords) && productData.keywords.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            Keywords: {productData.keywords.join(', ')}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
