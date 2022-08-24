import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      maxWidth: 600,
      '& .MuiOutlinedInput-root': {
        fontWeight: 'bold',
        color: theme.palette.textGrey,
        '&:hover fieldset': {
          border: 'none',
        },
      },
    },
  }),
);

export default useStyles;
