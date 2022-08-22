import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.backgroundGrey,
      borderRadius: theme.shape.borderRadius,
      margin: theme.spacing(2),
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      height: '100%',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
    },
    selected: {
      backgroundColor: theme.palette.green,
    },
    text: {
      textAlign: 'center',
    },
  }),
);

export default useStyles;
