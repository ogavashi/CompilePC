import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100% !important',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
      backgroundColor: `${theme.palette.backgroundBlack} !important`,
    },
    specTitle: {
      marginRight: theme.spacing(4),
      fontWeight: 700,
    },
    specValue: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkIcon: {
      color: theme.palette.green,
      margin: 0,
    },
  }),
);

export default useStyles;
