import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      margin: `${theme.spacing(3)} ${theme.spacing(6)}`,
      maxWidth: 850,
      backgroundColor: theme.palette.grey,
    },
    empty: {
      margin: `${theme.spacing(3)} ${theme.spacing(6)}`,
      width: 850,
      height: 395,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {},
    topRow: {
      display: 'flex',
      color: theme.palette.green,
    },
  }),
);

export default useStyles;
