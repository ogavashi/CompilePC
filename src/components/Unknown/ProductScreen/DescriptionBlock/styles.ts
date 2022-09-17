import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      padding: theme.spacing(4),
      textAlign: 'justify',
    },
  }),
);

export default useStyles;
