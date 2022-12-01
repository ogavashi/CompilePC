import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableBlock: {
      marginBottom: theme.spacing(2),
      width: `47% `,
    },
  }),
);

export default useStyles;
