import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      border: 'none',
      borderRadius: 10,
      margin: theme.spacing(1),
      '& .MuiInputBase-input': {
        minHeight: 50,
        backgroundColor: theme.palette.backgroundBlack,
        borderRadius: 10,
        border: 'none',
        fontSize: 20,
        textAlign: 'center',
      },
    },
  }),
);

export default useStyles;
