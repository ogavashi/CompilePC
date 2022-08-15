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
      width: '150px',
    },
    button: {
      cursor: 'pointer',
    },
    specsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      fontSize: '40px',
    },
  }),
);

export default useStyles;
