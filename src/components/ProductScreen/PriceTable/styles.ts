import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      margin: `${theme.spacing(3)} ${theme.spacing(6)}`,
      maxWidth: 850,
      maxHeight: 395,
      height: '100%',
    },
    pricesList: {
      maxHeight: 325,
      height: '100%',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: 4,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.green,
        borderRadius: theme.shape.borderRadius,
      },
    },
    overflow: {
      paddingRight: 10,
    },
    empty: {
      margin: `${theme.spacing(3)} ${theme.spacing(6)}`,
      width: 850,
      height: 395,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {},
    topRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(6),
      color: theme.palette.green,
      position: 'relative',
    },
  }),
);

export default useStyles;
