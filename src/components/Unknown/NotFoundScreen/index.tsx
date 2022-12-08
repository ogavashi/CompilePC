import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PSUBigIcon } from '../Icons';
import useStyles from './styles';

const NotFoundScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <Box
      height="calc(100vh - 64px)"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography className={styles.title} color="secondary" variant="h1">
          4
        </Typography>
        <PSUBigIcon className={styles.icon} />
        <Typography className={styles.title} color="secondary" variant="h1">
          4
        </Typography>
      </Box>
      <Typography className={styles.text} color="secondary" variant="h2">
        Page not found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/"
      >
        Go home
      </Button>
    </Box>
  );
};

export default NotFoundScreen;
