import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DialogTitle,
  DialogContent,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  IconButton,
} from '@mui/material';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Cookies from 'js-cookie';

import { type SignUpData } from 'interfaces';

import { signUp } from 'lib/api/auth';

import {
  currentUserState,
  isSignedInState,
} from 'components/recoil/States/AuthState';

import { dialogState } from 'components/recoil/DialogState';

import { useSetRecoilState } from 'recoil';

const SignupDialog = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const setDialogOpen = useSetRecoilState(dialogState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();

  const handleSignUpSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const params: SignUpData = {
      name,
      email,
      password,
      passwordConfirmation,
    };
    try {
      const res = await signUp(params);
      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'] ?? '');
        Cookies.set('_client', res.headers.client ?? '');
        Cookies.set('_uid', res.headers.uid ?? '');
        setCurrentUser(res.data.data);
        setIsSignedIn(true);

        navigate('/');
        console.log('Signed in successfully!');
        setDialogOpen({ isOpen: false, type: null });
      } else {
        console.log('Failed to sign up');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DialogTitle>
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', right: 10, top: 10 }}
          onClick={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <ClearOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="">
          <Card sx={{ boxShadow: 'none' }}>
            <CardHeader sx={{ textAlign: 'center' }} title="アカウント作成" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="name"
                margin="dense"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="email"
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                label="password"
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                label="passwordConfirmation"
                margin="dense"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="inherit"
                sx={{ mt: 2, flexGrow: 1, textTransform: 'none' }}
                onClick={(e) => {
                  void handleSignUpSubmit(e);
                }}
              >
                アカウント作成
              </Button>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </>
  );
};

export default SignupDialog;
