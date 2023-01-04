import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideSection: {
      width: '100%',
      maxWidth: 300,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(4),
    },
    emptyTitle: {
      fontSize: `${30}px !important`,
      textAlign: 'center',
    },
  }),
);

export default useStyles;
