import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { currentUserState, isSignedInState } from '../../atoms/authAtoms';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
} from '@mui/material';
import { type SignInData } from '../../interfaces';
import { signIn } from '../../api/auth';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);

  const navigate = useNavigate();

  const signInmutation = useMutation((data: SignInData) => signIn(data), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.set('_access_token', data.headers['access-token'] || '');
        Cookies.set('_client', data.headers['client'] || '');
        Cookies.set('_uid', data.headers['uid'] || '');
        setCurrentUser(data.data.data);
        setIsSignedIn(true);
        navigate('/');
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInmutation.mutate({ email, password });
  };

  return (
    <>
      <Grid item xs={12} sx={{ mt: 3 }}>
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
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
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
      </Grid>
    </>
  );
};

export default Login;
