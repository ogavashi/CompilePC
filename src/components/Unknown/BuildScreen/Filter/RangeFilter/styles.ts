import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginBottom: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    textField: {
      border: 'none',
      minHeight: 80,
      minWidth: 120,
      margin: theme.spacing(1),
      '& .MuiTextField-root': { border: 'none' },
      '& .MuiInputBase-input': {
        backgroundColor: theme.palette.backgroundBlack,
        border: 'none',
        fontSize: 20,
        textAlign: 'center',
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.backgroundBlack,
        border: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  }),
);

export default useStyles;
