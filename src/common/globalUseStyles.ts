import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const globalUseStyles = makeStyles((theme: Theme) => ({
  greenBuilderIcon: {
    backgroundColor: theme.palette.green,
    color: theme.palette.backgroundGrey,
    borderRadius: theme.shape.borderRadius,
  },
  redBuilderIcon: {
    backgroundColor: theme.palette.tomatoRed,
    color: theme.palette.backgroundGrey,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default globalUseStyles;
