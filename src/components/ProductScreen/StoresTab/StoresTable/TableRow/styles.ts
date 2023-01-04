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
      marginBottom: theme.spacing(6),
      backgroundColor: `${theme.palette.backgroundBlack} !important`,
      '&:last-child': {
        marginBottom: theme.spacing(0),
      },
    },
    storeName: {
      maxWidth: 300,
      width: '100%',
      textAlign: 'center',
    },
    image: {
      margin: theme.spacing(4),
      width: 120,
    },
    divider: {
      borderColor: `${theme.palette.backgroundGrey} !important`,
    },
    buyBlock: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(4),
    },
    price: {
      color: theme.palette.green,
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
  }),
);

export default useStyles;
