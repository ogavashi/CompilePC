import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: '180px',
    },
    text: {
      fontSize: '120px',
    },
    icon: {
      margin: theme.spacing(3),
    },
  }),
);

export default useStyles;
