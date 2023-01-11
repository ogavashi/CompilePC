import React, { useCallback, useState } from 'react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { registerSchema } from '../../common/schemas';

const RegisterScreen = () => {
  const styles = useStyles();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        Sign Up
      </Typography>
      <Box className={styles.card}>
        <form onSubmit={formik.handleSubmit}>
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
            id="fullName"
            label="Full Name"
            variant="outlined"
            color="secondary"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
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
          <TextField
            className={styles.input}
            id="passwordConfirmation"
            label="Confirm password"
            variant="outlined"
            color="secondary"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
          <Button
            sx={{ marginBottom: 4 }}
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/login"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
