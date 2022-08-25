import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      maxWidth: 600,
      '& .MuiInputBase-root': {
        fontWeight: 'bold',
        color: theme.palette.textGrey,
        padding: theme.spacing(1, 2),
      },
      '& .MuiInputBase-input': {
        padding: theme.spacing(1),
      },
    },
    searchIcon: {
      fill: theme.palette.textGrey,
    },
  }),
);

export default useStyles;
