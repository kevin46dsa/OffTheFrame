import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FAFAF8',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#1C1C1C', // near-black, softer than pure black
    },
    secondary: {
      main: '#9C6B3D', // muted gold / art accent
    },
    text: {
      primary: '#1C1C1C',
      secondary: '#5F5F5F',
    },
  },

  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),

    h1: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.6,
    },
  },

  shape: {
    borderRadius: 6,
  },

  shadows: [
    'none',
    '0px 2px 6px rgba(0,0,0,0.06)',
    ...Array(23).fill('0px 4px 12px rgba(0,0,0,0.08)'),
  ] as any,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
        },
      },
    },
  },
})
