import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(3),
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(4),
      color: 'white',
    },
    accordionSummary: {
      '& .MuiAccordionSummary-content': {
        padding: theme.spacing(2),
      },
    },
    productIcon: {
      width: '60px',
    },
    greenIcon: {
      backgroundColor: theme.palette.green,
      color: theme.palette.backgroundGrey,
      borderRadius: theme.spacing(1),
    },
    redIcon: {
      backgroundColor: theme.palette.tomatoRed,
      color: theme.palette.backgroundGrey,
      borderRadius: theme.spacing(1),
    },
    icon: {
      width: '30px',
    },
  }),
);

export default useStyles;
