import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: theme.spacing(60),
    },
    loader: {
      color: theme.palette.green,
    },
  }),
);

export default useStyles;
