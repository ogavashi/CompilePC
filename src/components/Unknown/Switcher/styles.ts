import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switcherButton: {
      minWidth: 100,
      borderRadius: 10,
    },
    toggleButtonGroup: {
      padding: theme.spacing(2),

      '& .MuiToggleButtonGroup-grouped': {
        border: 0,
        '&.Mui-disabled': {
          border: 0,
        },

        '&:first-of-type': {
          marginRight: theme.spacing(2),
        },
      },
    },
  }),
);

export default useStyles;
