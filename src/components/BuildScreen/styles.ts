import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: theme.spacing(16),
      gap: theme.spacing(8),
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.backgroundGrey,
      },
    },
    sideSection: {
      width: '100%',
      maxWidth: 300,
    },
    mainSection: {
      width: '100%',
    },
  }),
);

export default useStyles;
