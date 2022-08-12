import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundGrey: string;
  }
  interface PaletteOptions {
    backgroundGrey: string;
  }
}

const theme = createTheme({
  spacing: 10,
});

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#282828',
      contrastText: '#00B589',
    },
    secondary: {
      main: '#00B589',
      contrastText: '#fff',
    },
    background: {
      default: '#1A1A1A',
    },
    text: {
      primary: '#fff',
      secondary: '#00B589',
    },

    backgroundGrey: '#282828',
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#373737',
          color: '#fff',
          borderRadius: 10,
          padding: theme.spacing(),
          '&.Mui-focused': {
            border: '1px solid #00B589',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
        },
      },
    },
  },
});

export default defaultTheme;
