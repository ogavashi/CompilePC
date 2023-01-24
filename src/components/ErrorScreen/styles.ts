import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: theme.spacing(140),
      marginBottom: theme.spacing(2),
    },
  }),
);

export default useStyles;
