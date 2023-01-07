import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftWrapper: {
      backgroundColor: theme.palette.backgroundGrey,
      width: '50%',
      height: '100vh',
      padding: theme.spacing(10),
    },
    rightWrapper: {
      width: '50%',
      height: '100vh',
      padding: theme.spacing(10),
    },
    title: {
      color: theme.palette.green,
    },
    image: {
      width: theme.spacing(140),
    },
  }),
);

export default useStyles;
