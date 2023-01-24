import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.backgroundGrey,
      marginBottom: theme.spacing(6),
    },
    redIcon: {
      backgroundColor: theme.palette.tomatoRed,
      color: theme.palette.backgroundGrey,
      borderRadius: theme.spacing(1),
    },
    images: {
      minWidth: '240px',
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    title: {
      textDecoration: 'none',
      color: theme.palette.white,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
  }),
);

export default useStyles;
