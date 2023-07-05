import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isSignedInState } from '../../atoms/authAtoms';
import { dialogState } from '../../atoms/dialogState';
import { signOut } from '../../api/auth';
import { useSetRecoilState } from 'recoil';

import {
  DialogTitle,
  Card,
  CardHeader,
  CardActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';

import ClearOutlineIcon from '@mui/icons-material/ClearOutlined';

const LogoutDialog = () => {
  const setDialogOpen = useSetRecoilState(dialogState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signOutMutation = useMutation(() => signOut(), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');
        setIsSignedIn(false);
        queryClient.invalidateQueries('currentUser');
        navigate('/');
        setDialogOpen({ isOpen: false, type: null });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <>
      <DialogTitle>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            left: 10,
            top: 10,
          }}
          onClick={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <ClearOutlineIcon />
        </IconButton>
      </DialogTitle>
      <Card sx={{ m: 3, boxShadow: 'none' }}>
        <CardHeader title="ログアウトしますか？" sx={{ align: 'center' }} />
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: '9999px' }}
            onClick={() => handleSignOut()}
          >
            <Typography>ログアウト</Typography>
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ borderRadius: '9999px' }}
            onClick={() => setDialogOpen({ isOpen: false, type: null })}
          >
            キャンセル
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default LogoutDialog;
