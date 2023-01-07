import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.green,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(4),
      padding: theme.spacing(4),
      backgroundColor: theme.palette.backgroundGrey,
      borderRadius: theme.shape.borderRadius,
      maxWidth: 500,
      width: '100%',
    },
    input: {
      width: '100%',
      marginBottom: `${theme.spacing(4)} !important`,
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.backgroundBlack,

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.backgroundBlack,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.green,
        },
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
