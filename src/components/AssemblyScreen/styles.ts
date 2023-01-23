import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    leftWrapper: {
      width: '40%',
      marginRight: theme.spacing(10),
    },
    rightWrapper: {
      width: '50%',
    },
    image: {
      width: theme.spacing(140),
      marginBottom: theme.spacing(2),
    },
  }),
);

export default useStyles;
