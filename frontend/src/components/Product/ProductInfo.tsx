import { Box, Typography, Divider, Stack } from '@mui/material'
import type { ProductInfoProps } from '../../types/productPageInterfaces'

export function ProductInfo({ productData }: ProductInfoProps) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {productData.title}
      </Typography>

      <Typography color="text.secondary" gutterBottom>
        {productData.artist}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        ${productData.price}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" sx={{ mb: 3 }}>
        {productData.description}
      </Typography>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Category: {productData.category}
        </Typography>

        {productData.keywords && productData.keywords?.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            Keywords: {productData.keywords.join(', ')}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
