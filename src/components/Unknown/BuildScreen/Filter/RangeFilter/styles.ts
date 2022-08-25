import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  }),
);

export default useStyles;
