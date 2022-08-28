import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundGrey: string;
    backgroundBlack: string;
    green: string;
    tomatoRed: string;
    white: string;
    lightGrey: string;
    textGrey: string;
  }
  interface PaletteOptions {
    backgroundGrey: string;
    backgroundBlack: string;
    green: string;
    tomatoRed: string;
    white: string;
    lightGrey: string;
    textGrey: string;
  }
}

const theme = createTheme({
  spacing: 4,
});

const colors = {
  green: '#00B589',
  black: '#1A1A1A',
  grey: '#282828',
  white: '#FFFFFF',
  lightGrey: '#373737',
  buttonLightGrey: '#3E3E3E',
  red: '#FC4422',
  textGrey: '#6B6D7F',
};

const defaultTheme = createTheme({
  ...theme,
  palette: {
    primary: {
      main: colors.buttonLightGrey,
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
    backgroundBlack: colors.black,
    backgroundGrey: colors.grey,
    tomatoRed: colors.red,
    green: colors.green,
    white: colors.white,
    lightGrey: colors.lightGrey,
    textGrey: colors.textGrey,
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 600,
    },
    h2: {
      fontSize: 40,
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
    },
    h4: {
      fontSize: 40,
      fontWeight: 600,
    },
    h5: {
      fontSize: 26,
      fontWeight: 500,
    },
    h6: {
      fontSize: 14,
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
          color: colors.textGrey,
          borderRadius: 10,
          padding: theme.spacing(1),
          '& .Mui-focused': {
            border: `1px solid ${colors.green}`,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover:not(.Mui-disabled)': {
            cursor: 'default',
          },
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover:not(.Mui-disabled)': {
            cursor: 'default',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover:not(.Mui-disabled)': {
            cursor: 'default',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey,
        },
      },
    },
  },
});

export default defaultTheme;
