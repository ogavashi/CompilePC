import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(10),
    },
    spec: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: theme.spacing(2),
    },
    productName: {
      textDecoration: 'none',
      color: theme.palette.white,
      marginLeft: '0.5rem',
    },
  }),
);

export default useStyles;
