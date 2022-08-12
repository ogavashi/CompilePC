import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundGrey: string;
  }
  interface PaletteOptions {
    backgroundGrey: string;
  }
}

const theme = createTheme({});

const colors = {
  green: '#00B589',
  black: '#1A1A1A',
  grey: '#282828',
  white: '#FFFFFF',
  lightGrey: '#373737',
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.grey,
      contrastText: colors.green,
    },
    secondary: {
      main: colors.green,
      contrastText: colors.white,
    },
    background: {
      default: colors.black,
    },
    text: {
      primary: colors.white,
      secondary: colors.green,
    },

    backgroundGrey: colors.grey,
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
          backgroundColor: colors.lightGrey,
          color: colors.white,
          borderRadius: 10,
          padding: theme.spacing(1),
          '&.Mui-focused': {
            border: `1px solid ${colors.green}`,
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
