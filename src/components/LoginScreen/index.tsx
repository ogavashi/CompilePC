import React, { useCallback, useState } from 'react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const LoginScreen = () => {
  const styles = useStyles();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  );

  const EyeIcon = () => (
    <InputAdornment position="start">
      <IconButton sx={{ padding: 0 }} onClick={handleShowPassword}>
        {!showPassword ? (
          <VisibilityIcon color="secondary" />
        ) : (
          <VisibilityOffIcon color="secondary" />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <Typography className={styles.title} variant="h2">
        Sign In
      </Typography>
      <Box component="form" className={styles.card}>
        <TextField
          className={styles.input}
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          color="secondary"
          InputProps={{
            classes: { input: styles.autoInport },
          }}
        />
        <TextField
          className={styles.input}
          id="password"
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          color="secondary"
          InputProps={{
            classes: { input: styles.autoInport },
            endAdornment: <EyeIcon />,
          }}
        />
        <Button
          sx={{ marginBottom: 4 }}
          variant="contained"
          color="secondary"
          fullWidth
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/register"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginScreen;
