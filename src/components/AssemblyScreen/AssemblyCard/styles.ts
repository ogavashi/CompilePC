import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainWrapper: {
      width: '50%',
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.backgroundGrey,
      },
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    totalWrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(2),
    },
    emptyTitle: {
      fontSize: `${30}px !important`,
      textAlign: 'center',
    },
    totalTitle: {
      fontWeight: 'bold !important',
      fontSize: `${30}px !important`,
      marginRight: `${theme.spacing(2)} !important`,
    },
    totalSum: {
      fontSize: `${30}px !important`,
      fontWeight: 'regular !important',
    },
    divider: {
      borderColor: `${theme.palette.backgroundBlack} !important`,
    },
    button: {
      margin: `${theme.spacing(2)} !important`,
    },
  }),
);

export default useStyles;
