import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import SigninForm from '../signForm/signInForm';
import SignupForm from '../signForm/signUpForm';
import MovieIcon from '@mui/icons-material/Movie';
import Typography from '@mui/material/Typography';

const actionState = {
  signin: 'signin',
  signup: 'signup',
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const switchAuthState = (state) => setAction(state);
  const handleClose = () => {
    window.location.href = '/';
    dispatch(setAuthModalOpen(false));
  };

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
        }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <MovieIcon />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              iMovies
            </Typography>
          </Box>

          {action === actionState.signin && (
            <SigninForm switchFun={() => switchAuthState(actionState.signup)} />
          )}

          {action === actionState.signup && (
            <SignupForm switchFun={() => switchAuthState(actionState.signin)} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
