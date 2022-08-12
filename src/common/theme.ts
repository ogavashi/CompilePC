import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 600,
    },
  },
});

export default defaultTheme;
