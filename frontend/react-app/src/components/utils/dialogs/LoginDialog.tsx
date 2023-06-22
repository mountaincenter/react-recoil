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
import { type SignInData } from 'interfaces';
import { signIn } from 'lib/api/auth';
import { useFetchCurrentUser } from 'hooks/useFetchCurrentUser';
import {
  currentUserState,
  isSignedInState,
} from 'components/recoil/States/AuthState';

import { dialogState } from 'components/recoil/DialogState';
import { useSetRecoilState } from 'recoil';
import { useSignIn } from 'hooks/useSignIn';

const LoginDialog = () => {
  const setDialogOpen = useSetRecoilState(dialogState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: signIn } = useSignIn();
  const { refetch: fetchCurrentUser } = useFetchCurrentUser();

  const handleSignInSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const params: SignInData = {
      email,
      password,
    };
    signIn(params, {
      onSuccess: async (data) => {
        if (data.status === 200) {
          await fetchCurrentUser();
          navigate('/');
          console.log('ログイン成功');
          console.log(data.data.data);
        } else {
          console.log('ログイン失敗');
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <DialogTitle>
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', left: 10, top: 10 }}
          onClick={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <ClearOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="">
          <Card
            sx={{
              boxShadow: 'none',
            }}
          >
            <CardHeader sx={{ textAlign: 'center' }} title="ログイン" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="inherit"
                sx={{ marginTop: 2, flexGrow: 1, textTransform: 'none' }}
                onClick={(e) => {
                  void handleSignInSubmit(e);
                }}
              >
                ログイン
              </Button>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </>
  );
};

export default LoginDialog;
