import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import type { ProductMediaProps } from '../../types/productPageInterfaces'

const bucket = import.meta.env.VITE_PRODUCTS_BUCKET
const region = import.meta.env.VITE_AWS_REGION

const getImageUrl = (key?: string) =>
  key ? `https://${bucket}.s3.${region}.amazonaws.com/${key}` : 'https://via.placeholder.com/1200x1600'

function ImageTile({
  src,
  alt,
  height,
}: {
  src: string
  alt: string
  height: { xs: number; md: number }
}) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: { xs: 2, md: 3 },
        transform: 'translateZ(0)',

        // Only apply hover effects on devices that support hover
        '@media (hover: hover)': {
          '&:hover img': { transform: 'scale(1.03)' },
          '&:hover': { boxShadow: 8 },
        },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{
          display: 'block',
          width: '100%',
          height,
          objectFit: 'cover',
          transition: 'transform 220ms ease',
          transform: 'scale(1)',
        }}
      />
    </Box>
  )
}

export function ProductMedia({ productData }: ProductMediaProps) {
  const primary = getImageUrl(productData.images.primary)
  const [g1, g2] = productData.images.gallery ?? []

  return (
    <Grid container spacing={2}>
      {/* Row 1: Primary full width on mobile, left column on desktop */}
      <Grid size={{ xs: 12, md: 8 }}>
        <ImageTile
          src={primary}
          alt={productData.title}
          // +10% from prior suggestion (xs 360->400, md 560->620)
          height={{ xs: 400, md: 620 }}
        />
      </Grid>

      {/* Desktop right column: two stacked */}
      <Grid size={{ xs: 12, md: 4 }} container spacing={2}>
        {/* Mobile Row 2: two columns (each 6). Desktop: stacked (12). */}
        <Grid size={{ xs: 6, md: 12 }}>
          <ImageTile
            src={getImageUrl(g1)}
            alt={`${productData.title} gallery 1`}
            // +10% from prior (xs 220->245, md 270->300)
            height={{ xs: 245, md: 300 }}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 12 }}>
          <ImageTile
            src={getImageUrl(g2)}
            alt={`${productData.title} gallery 2`}
            height={{ xs: 245, md: 300 }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
