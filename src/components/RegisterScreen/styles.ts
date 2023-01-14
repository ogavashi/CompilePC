import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.green,
    },
    card: {
      margin: theme.spacing(4),
      padding: theme.spacing(4),
      backgroundColor: theme.palette.backgroundGrey,
      borderRadius: theme.shape.borderRadius,
      maxWidth: 500,
      width: '100%',
    },
    input: {
      width: '100%',
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      minHeight: '84px !important',

      '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.backgroundBlack,
        '& fieldset': {
          borderColor: theme.palette.backgroundBlack,
          color: 'white',
        },
        '&:hover fieldset': {
          borderColor: theme.palette.green,
        },
      },
      '& .MuiFormHelperText-root': {
        backgroundColor: theme.palette.backgroundGrey,
      },
    },
    // FIX LATER
    autoInport: {
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 50px ${theme.palette.backgroundBlack} inset`,
        WebkitTextFillColor: 'white',
      },
    },

    button: {
      marginBottom: `${theme.spacing(4)} !important`,
    },
  }),
);

export default useStyles;
