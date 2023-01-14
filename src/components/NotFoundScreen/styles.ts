import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: `${180}px !important`,
    },
    text: {
      fontSize: `${120}px !important`,
    },
    icon: {
      margin: theme.spacing(3),
    },
  }),
);

export default useStyles;
