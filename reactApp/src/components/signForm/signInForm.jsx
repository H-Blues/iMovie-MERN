import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { login } from '../../api/customApi';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUserInfo, setToken, setIsAuthenticated } from '../../redux/features/userSlice';

const SigninForm = ({ switchFun }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'username minimum 3 characters')
        .required('Username is required.'),
      password: Yup.string()
        .min(5, 'password minimum 5 characters')
        .required('Password is required.'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const response = await login(values.username, values.password);
      setIsLoginRequest(false);
      if (response.success) {
        signinForm.resetForm();
        dispatch(setToken(response.token));
        dispatch(setUserInfo(response.user));
        dispatch(setIsAuthenticated(true));
        toast.success('Sign in success');
        dispatch(setAuthModalOpen(false));
      }
      if (!response.success) setErrorMessage(response.msg);
    },
  });

  return (
    <>
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
        </Stack>

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}>
          sign in
        </LoadingButton>

        <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchFun()}>
          sign up
        </Button>

        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SigninForm;
