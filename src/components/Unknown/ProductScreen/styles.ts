import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: theme.spacing(8),
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.backgroundGrey,
        width: 'fit-content',
        height: 'fit-content',
      },
    },
    image: {
      width: theme.spacing(160),
    },
  }),
);

export default useStyles;
