import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isSignedInState, currentUserState } from '../../atoms/authAtoms';
import { dialogState } from '../../atoms/dialogState';
import { signIn } from '../../api/auth';
import { type SignInData } from 'interfaces';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from '@mui/material';

import { DialogTitleComponent } from '../common/DialogTitle';
import AlertMessage from '../../components/utils/AlertMessage';

const LoginDialog = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setDialogOpen = useSetRecoilState(dialogState);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const signInmutation = useMutation((data: SignInData) => signIn(data), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.set('_access_token', data.headers['access-token'] || '');
        Cookies.set('_client', data.headers['client'] || '');
        Cookies.set('_uid', data.headers['uid'] || '');
        setCurrentUser(data.data.data);
        setIsSignedIn(true);
        queryClient.invalidateQueries('users');
        queryClient.invalidateQueries('currentUser');
        navigate('/');
        setDialogOpen({ isOpen: false, type: null });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInmutation.mutate({ email, password });
  };

  return (
    <>
      <Grid item mobile={12} sx={{ mt: 3 }}>
        <DialogTitleComponent />
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Card sx={{ padding: 2, maxWidth: 400 }}>
            <CardHeader sx={{ textAlign: 'center' }} title="ログイン" />
            <CardContent>
              <TextField
                id="outlined-basic"
                label="メールアドレス"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="パスワード"
                type="password"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                sx={{ marginTop: 2, flexGrow: 1, textTransform: 'none' }}
              >
                ログイン
              </Button>
            </CardContent>
          </Card>
        </form>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="ログインできませんでした"
        />
      </Grid>
    </>
  );
};

export default LoginDialog;
