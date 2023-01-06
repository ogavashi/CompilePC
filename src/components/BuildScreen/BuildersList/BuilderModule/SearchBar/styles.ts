import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      fontSize: 20,
      maxWidth: 700,
      width: '100%',
      border: 'none',
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.lightGrey,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },

    icon: {
      color: theme.palette.green,
    },
    button: {
      backgroundColor: `${theme.palette.lightGrey} !important`,
      borderRadius: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px !important`,
    },
  }),
);

export default useStyles;
