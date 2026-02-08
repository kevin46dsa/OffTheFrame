import { Grid } from '@mui/material'
import { Box, Button, Stack, Typography, Chip } from '@mui/material'
import { useMemo } from 'react'

const bucket = import.meta.env.VITE_PRODUCTS_BUCKET
const region = import.meta.env.VITE_AWS_REGION

const toS3 = (key?: string) =>
  key ? `https://${bucket}.s3.${region}.amazonaws.com/${key}` : 'https://via.placeholder.com/1200x1600'

/**
 * Slower-than-native smooth scroll (scrollIntoView speed can't be tuned).
 * durationMs ~ 1100–1600 feels “premium” without being annoying.
 */
function slowScrollToId(id: string, durationMs = 1300) {
  const el = document.getElementById(id)
  if (!el) return

  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + window.scrollY
  const diff = targetY - startY
  const start = performance.now()

  // easeInOutCubic
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  const tick = (now: number) => {
    const elapsed = now - start
    const t = Math.min(1, elapsed / durationMs)
    window.scrollTo(0, startY + diff * ease(t))
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

function MosaicTile({
  src,
  alt,
  anim = 'floatA',
  delay = '0ms',
}: {
  src: string
  alt: string
  anim?: 'floatA' | 'floatB' | 'floatC'
  delay?: string
}) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        transform: 'translateZ(0)',

        // ✅ shadow reference (visible even on light backgrounds)
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 10,
          height: 18,
          borderRadius: 999,
          background: 'rgba(0,0,0,0.22)',
          filter: 'blur(16px)',
          opacity: 0.26,
          transform: 'scale(0.96)',
          transition: 'opacity 240ms ease',
          pointerEvents: 'none',
        },

        // living motion (subtle), but respect reduced motion
        '@media (prefers-reduced-motion: no-preference)': {
          animation: `${anim} 9s ease-in-out infinite`,
          animationDelay: delay,
        },

        '@media (hover: hover)': {
          '&:hover img': { transform: 'scale(1.035)' },
          '&:hover::after': { opacity: 0.34 }, // slightly stronger on hover
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
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1)',
          transition: 'transform 240ms ease',
        }}
      />
    </Box>
  )
}

export function ShopHero() {
  // Replace these with real featured image keys
  const images = useMemo(() => [toS3("thumbnails/p027/1.png"), toS3("thumbnails/p022/primary22.png"), toS3("thumbnails/p017/2.png")], [])

  return (
    <Box
      sx={{

    // Wider hero on desktop (keep what you already have)
    width: { xs: '100%', md: 'calc(100% + 120px)' },
    ml: { xs: 0, md: '-60px' },
    mr: { xs: 0, md: '-60px' },

    borderRadius: { xs: 4, md: 6 },
    px: { xs: 2, sm: 3, md: 7 },
    py: { xs: 4, md: 6 },
    mb: { xs: 4, md: 6 },

    // ✅ slightly darker than page background, still “off-white”
background:
'linear-gradient(180deg, rgba(246,245,243,0.96), rgba(228,224,217,0.92))',  // subtle “glass” + depth
    backdropFilter: 'blur(10px)',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 18px 60px rgba(0,0,0,0.06)',
    // optional: a light inner highlight for premium feel
    boxSizing: 'border-box',


        // Page-load entrance
        opacity: 0,
        transform: 'translateY(10px)',
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'heroIn 700ms ease forwards',
        },
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
          transform: 'none',
        },

        
        '@keyframes animShadow': {
  '0%, 100%': { transform: 'scale(0.96)' },
  '50%': { transform: 'scale(1.02)' },
},

        // Keyframes (scoped to this Box via sx)
        '@keyframes heroIn': {
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes floatA': {
  '0%, 100%': { transform: 'translate3d(0px, 0px, 0)' },
  '50%': { transform: 'translate3d(2px, -8px, 0)' },
},
'@keyframes floatB': {
  '0%, 100%': { transform: 'translate3d(0px, 0px, 0)' },
  '50%': { transform: 'translate3d(-2px, -6px, 0)' },
},
'@keyframes floatC': {
  '0%, 100%': { transform: 'translate3d(0px, 0px, 0)' },
  '50%': { transform: 'translate3d(1px, -7px, 0)' },
},
'@keyframes floatAShadow': {
  '0%, 100%': { transform: 'scale(0.96)', opacity: 0.26 },
  '50%': { transform: 'scale(0.90)', opacity: 0.20 },
},
'@keyframes floatBShadow': {
  '0%, 100%': { transform: 'scale(0.96)', opacity: 0.25 },
  '50%': { transform: 'scale(0.91)', opacity: 0.19 },
},
'@keyframes floatCShadow': {
  '0%, 100%': { transform: 'scale(0.96)', opacity: 0.26 },
  '50%': { transform: 'scale(0.905)', opacity: 0.19 },
},
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, md: 6 }}
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
      >
        {/* Mosaic FIRST on mobile */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: '1.2fr 0.8fr' },
              gridTemplateRows: { xs: '180px 180px', md: '240px 240px' },
              gap: 2,

              // slight stagger entrance for mosaic
              opacity: 0,
              transform: 'translateY(8px)',
              '@media (prefers-reduced-motion: no-preference)': {
                animation: 'fadeUp 650ms ease forwards',
                animationDelay: '120ms',
              },
              '@keyframes fadeUp': {
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box sx={{ gridRow: '1 / span 2' }}>
              <MosaicTile src={images[0]} alt="Featured artwork 1" anim="floatA" delay="0ms" />
            </Box>
            <MosaicTile src={images[1]} alt="Featured artwork 2" anim="floatB" delay="300ms" />
            <MosaicTile src={images[2]} alt="Featured artwork 3" anim="floatC" delay="600ms" />
          </Box>
        </Grid>

        {/* Copy SECOND on mobile */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
          <Stack spacing={2.2}>
            <Box
              sx={{
                // stagger entrance for text
                opacity: 0,
                transform: 'translateY(10px)',
                '@media (prefers-reduced-motion: no-preference)': {
                  animation: 'fadeUp2 700ms ease forwards',
                  animationDelay: '220ms',
                },
                '@keyframes fadeUp2': {
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Chip label="Curated art prints" variant="outlined" sx={{ mb: 1.5, fontWeight: 500 }} />

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.35rem' },
                  lineHeight: 1.05,
                  letterSpacing: -0.5,
                }}
              >
                Art that feels
                <br />
                like your space.
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1.5,
                  fontSize: { xs: '1rem', md: '1.05rem' },
                  maxWidth: 560,
                }}
              >
                Original works and limited edition prints, designed to elevate calm, modern interiors.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                opacity: 0,
                '@media (prefers-reduced-motion: no-preference)': {
                  animation: 'fadeOnly 600ms ease forwards',
                  animationDelay: '380ms',
                },
                '@keyframes fadeOnly': { to: { opacity: 1 } },
              }}
            >
              <Box>• Museum-grade quality</Box>
              <Box>• Limited runs</Box>
              <Box>• Fast delivery</Box>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{
                opacity: 0,
                transform: 'translateY(8px)',
                '@media (prefers-reduced-motion: no-preference)': {
                  animation: 'fadeUp3 650ms ease forwards',
                  animationDelay: '460ms',
                },
                '@keyframes fadeUp3': { to: { opacity: 1, transform: 'translateY(0)' } },
              }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => slowScrollToId('shop', 1400)}
                sx={{ borderRadius: 999, px: 3, py: 1.2 }}
              >
                Shop prints
              </Button>

              <Button size="large" variant="outlined" sx={{ borderRadius: 999, px: 3, py: 1.2 }}>
                About the studio
              </Button>
            </Stack>

            <Typography color="text.secondary" sx={{ fontSize: 13 }}>
              Scroll for the full collection ↓
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
