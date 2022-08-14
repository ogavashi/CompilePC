import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buildPageContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(16),
      gap: theme.spacing(8),
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.backgroundGrey,
        padding: theme.spacing(4),
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
