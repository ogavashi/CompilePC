import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    totalWrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(2),
    },
    totalTitle: {
      fontWeight: 'bold',
      fontSize: 30,
      marginRight: theme.spacing(2),
    },
    totalSum: {
      fontSize: 30,
    },
    divider: {
      borderColor: `${theme.palette.backgroundBlack} !important`,
    },
    button: {
      margin: theme.spacing(2),
    },
  }),
);

export default useStyles;
