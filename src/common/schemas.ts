import * as yup from 'yup';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup.string().required('username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const loginSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const saveAssemblySchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .matches(/^[a-zA-Z0-9_ .-]*$/, 'Title has forbidden characters'),
});

export { registerSchema, loginSchema, saveAssemblySchema };
