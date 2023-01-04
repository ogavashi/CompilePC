import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: `${theme.palette.backgroundGrey} !important`,
      borderRadius: `${theme.shape.borderRadius}px !important`,
      margin: theme.spacing(2),
      cursor: 'pointer',
    },
    button: {
      width: '100% !important',
      height: '100% !important',
      borderRadius: `${theme.shape.borderRadius}px !important`,
      padding: `${theme.spacing(2)} !important`,
    },
    selected: {
      backgroundColor: `${theme.palette.green} !important`,
    },
    text: {
      textAlign: 'center',
    },
  }),
);

export default useStyles;
