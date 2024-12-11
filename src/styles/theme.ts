import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A2A2A', // Dark gray for vinyl-like aesthetic
      light: '#404040',
      dark: '#1A1A1A',
    },
    secondary: {
      main: '#8B4513', // Saddle brown for vintage wood tones
      light: '#A0522D',
      dark: '#6B3811',
    },
    background: {
      default: '#121212', // Deep dark for immersive experience
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Crimson Text", "Times New Roman", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          padding: '12px 24px',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
}); 