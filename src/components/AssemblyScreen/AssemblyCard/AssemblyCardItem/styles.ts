import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      padding: theme.spacing(3),
      margin: theme.spacing(2),
      backgroundColor: `${theme.palette.backgroundBlack} !important`,
    },
    icon: {
      filter: 'grayscale(100%)',
    },
    partName: {
      textAlign: 'center',
      maxWidth: theme.spacing(80),
      textDecoration: 'none',
      color: theme.palette.white,
    },
    redIcon: {
      backgroundColor: theme.palette.tomatoRed,
      color: theme.palette.backgroundGrey,
      borderRadius: theme.spacing(1),
    },
  }),
);

export default useStyles;
