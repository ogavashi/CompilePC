import React, { useCallback, useContext, useState, useMemo } from 'react';
import { IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import useStyles from './styles';
import { loginSchema } from '../../common/schemas';
import { login } from '../../store/user/slice';
import { LoadingState, ROUTES } from '../../common/constants';
import { selectLoadingState } from '../../store/user/selectors';
import { AppDispatch } from '../../store';

const LoginScreen = () => {
  const styles = useStyles();

  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loadingState = useSelector(selectLoadingState);

  const isLoading = useMemo(
    () => loadingState === LoadingState.LOADING,
    [loadingState],
  );

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
      dispatch(login(values));
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
        <LoadingButton
          sx={{ marginBottom: 4 }}
          variant="contained"
          color="secondary"
          fullWidth
          type="submit"
          loading={isLoading}
        >
          Sign In
        </LoadingButton>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to={ROUTES.REGISTER}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginScreen;
