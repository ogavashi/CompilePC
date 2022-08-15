import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    icon: {
      width: '30px',
    },
  }),
);

export default useStyles;
