import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: theme.palette.backgroundGrey,
      padding: theme.spacing(4),
      borderRadius: theme.shape.borderRadius,
    },
    divider: {
      backgroundColor: theme.palette.green,
      marginBottom: theme.spacing(2),
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
    button: {
      margin: `${theme.spacing(2)} !important`,
    },
  }),
);

export default useStyles;
