import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    store: {
      color: theme.palette.white,
      transition: '0.3s',
      '&:hover': {
        color: theme.palette.green,
      },
    },
    price: {
      color: theme.palette.green,
      fontWeight: 600,
    },
  }),
);

export default useStyles;
