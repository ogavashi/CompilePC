import * as yup from 'yup';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullName: yup.string().required('Full Name is required'),
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

export { registerSchema, loginSchema };
