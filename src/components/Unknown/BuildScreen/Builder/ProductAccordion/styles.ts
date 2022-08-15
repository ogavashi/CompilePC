import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      color: 'white',
    },
    button: {
      cursor: 'pointer',
      fontSize: 'large',
    },
    icon: {
      width: '30px',
    },
  }),
);

export default useStyles;
