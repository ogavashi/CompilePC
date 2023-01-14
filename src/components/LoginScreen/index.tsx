import React, { useCallback, useState } from 'react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { loginSchema } from '../../common/schemas';
import { setUser } from '../../store/user/slice';

const LoginScreen = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
      <Box
        component="form"
        className={styles.card}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          className={styles.input}
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          color="secondary"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          type="submit"
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
