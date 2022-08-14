import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundGrey: string;
    tomatoRed: string;
  }
  interface PaletteOptions {
    backgroundGrey: string;
    tomatoRed: string;
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
    backgroundGrey: colors.grey,
    tomatoRed: colors.red,
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: colors.grey,
          '&:hover:not(.Mui-disabled)': {
            cursor: 'default',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: colors.grey,
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
          backgroundColor: colors.grey,
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
