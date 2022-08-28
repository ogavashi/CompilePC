import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      margin: theme.spacing(3),
      backgroundColor: `${theme.palette.backgroundBlack} !important`,
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
    },
    accordionSummary: {
      backgroundColor: theme.palette.backgroundBlack,
      '& .MuiAccordionSummary-content': {
        padding: theme.spacing(2),
      },
    },
    greenIcon: {
      backgroundColor: theme.palette.green,
      color: theme.palette.backgroundBlack,
      borderRadius: theme.spacing(1),
    },
    redIcon: {
      backgroundColor: theme.palette.tomatoRed,
      color: theme.palette.backgroundGrey,
      borderRadius: theme.spacing(1),
    },
  }),
);

export default useStyles;
