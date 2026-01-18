import { Box } from '@mui/material'
import type { ProductMediaProps } from '../../types/productPageInterfaces'

export function ProductMedia({ productData }: ProductMediaProps) {
  return (
    <Box>
      <Box
        component="img"
        src={productData.images.primary}
        alt={productData.title}
        sx={{
          width: '100%',
          borderRadius: 1,
          mb: 2,
        }}
      />

      {productData.images.gallery?.length > 0 && (
        <Box
          component="img"
          src={productData.images.gallery[0]}
          alt={productData.title}
          sx={{
            width: '100%',
            borderRadius: 1,
          }}
        />
      )}
    </Box>
  )
}
