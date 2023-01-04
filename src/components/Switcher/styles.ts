import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switcherButton: {
      minWidth: 120,
      borderRadius: `${theme.shape.borderRadius}px !important`,
      color: `${theme.palette.white} !important`,
      '& .MuiToggleButton': {
        color: theme.palette.white,
      },
    },
    toggleButtonGroup: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.backgroundBlack,
      color: theme.palette.white,
      '& .MuiToggleButtonGroup-grouped': {
        border: 0,
        '&.Mui-disabled': {
          border: 0,
        },
        '&:not(:first-of-type)': {
          borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
          marginRight: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  }),
);

export default useStyles;
