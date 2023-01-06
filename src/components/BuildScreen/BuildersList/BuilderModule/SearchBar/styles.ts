import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      fontSize: 20,
      maxWidth: 700,
      width: '100%',
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.lightGrey,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
    noBorder: {
      border: 'none',
    },
    icon: {
      color: theme.palette.green,
    },
  }),
);

export default useStyles;
