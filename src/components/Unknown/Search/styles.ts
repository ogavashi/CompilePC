import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      maxWidth: 600,
      '& .MuiInputBase-root': {
        fontWeight: 'bold',
        color: theme.palette.textGrey,
        padding: '4px 10px',
      },
      '& .MuiInputBase-input': {
        padding: 3,
      },
    },
  }),
);

export default useStyles;
