import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      padding: theme.spacing(4),
      textAlign: 'justify',
    },
    descriptionPaper: {
      width: '100% !important',
    },
  }),
);

export default useStyles;
