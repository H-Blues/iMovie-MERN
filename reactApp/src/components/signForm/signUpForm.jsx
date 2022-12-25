import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { signup } from '../../api/customApi';

const SignupForm = ({ switchFun }) => {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username minimum 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Must be a valid email address')
        .max(255)
        .required('Email is required'),
      password: Yup.string()
        .min(5, 'Password minimum 5 characters')
        .required('Password is required')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
          'Password must contain at least 5 characters, at least 1 letter and 1 number.'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'ConfirmPassword not match')
        .min(5, 'ConfirmPassword minimum 5 characters')
        .required('ConfirmPassword is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const response = await signup(values.username, values.email, values.password);
      setIsLoginRequest(false);

      if (response.success) {
        signinForm.resetForm();
        switchFun();
        toast.success('Sign up success');
      }

      if (!response.success) setErrorMessage(response.msg);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.username && signinForm.errors.username !== undefined}
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="email"
          name="email"
          fullWidth
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.displayName && signinForm.errors.displayName !== undefined}
          helperText={signinForm.touched.displayName && signinForm.errors.displayName}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.password && signinForm.errors.password !== undefined}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword && signinForm.errors.confirmPassword !== undefined
          }
          helperText={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}>
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchFun()}>
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
