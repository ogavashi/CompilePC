import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: `2px solid ${theme.palette.backgroundBlack}`,
      '&:first-child': {
        border: 'none',
      },
    },
    leftWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    rightWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    image: {
      width: '100px !important',
      height: '150px !important',
      margin: theme.spacing(5),
      variant: 'rounded',
      animation: 'wave',
    },
    button: {
      animation: 'wave',
      width: '35px !important',
      height: '55px !important',
      borderRadius: '4px',
    },
    specsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
