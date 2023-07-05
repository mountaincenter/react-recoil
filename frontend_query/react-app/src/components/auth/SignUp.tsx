import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
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
import { type SignUpData } from 'interfaces';
import { signUp } from '../../api/auth';
import Cookies from 'js-cookie';

import AlertMessage from '../../components/utils/AlertMessage';

const SignUp = () => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const [form, setForm] = useState<SignUpData>({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const signUpmutation = useMutation((data: SignUpData) => signUp(data), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.set('_access_token', data.headers['access-token'] || '');
        Cookies.set('_client', data.headers['client'] || '');
        Cookies.set('_uid', data.headers['uid'] || '');
        setCurrentUser(data.data.data);
        setIsSignedIn(true);
        queryClient.invalidateQueries('users');
        navigate('/');
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpmutation.mutate(form);
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
                label="お名前"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="ユーザーネーム:空欄の場合ランダム8文字の文字列となります"
                variant="outlined"
                fullWidth
                margin="dense"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="メールアドレス"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="パスワード"
                type="password"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="パスワード確認"
                type="password"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="passwordConfirmation"
                value={form.passwordConfirmation}
                onChange={handleChange}
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
          message="アカウント作成できませんでした"
        />
      </Grid>
    </>
  );
};

export default SignUp;
