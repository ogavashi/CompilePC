import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(16),
      gap: theme.spacing(8),
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.backgroundGrey,
      },
    },
  }),
);

export default useStyles;
