import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
  } from '@mui/material'
  import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
  import { useNavigate } from 'react-router-dom'
  import { useCart } from '../../service/cart/useCart'
  import { useCartUi } from '../../service/cart/cartUiContext'
  
  export function Navbar() {
    const navigate = useNavigate()
    const { items } = useCart()
    const { openCart } = useCartUi()
  
    const itemCount = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  
    return (
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo / Brand */}
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Typography variant="h6">
              #OffTheFrame
            </Typography>
          </Box>

          {/* Cart */}
          {(window.location.pathname !== '/checkout' && !window.location.pathname.includes('/order/complete')) && (
            <IconButton onClick={openCart}>
              <Badge
                badgeContent={itemCount}
                color="primary"
            >
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
          )}
        </Toolbar>
      </AppBar>
    )
  }
  