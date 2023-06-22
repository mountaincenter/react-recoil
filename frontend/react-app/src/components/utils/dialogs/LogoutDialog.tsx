import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  DialogTitle,
  IconButton,
  Card,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useSetRecoilState } from 'recoil';
import { dialogState } from 'components/recoil/DialogState';

import { signOut } from 'lib/api/auth';

import {
  currentUserState,
  isSignedInState,
} from 'components/recoil/States/AuthState';

const LogoutDialog = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setDialogOpen = useSetRecoilState(dialogState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const navigate = useNavigate();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const res = await signOut();
      console.log(res);
      if (res.data.success === true) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');
        setIsSignedIn(false);
        setCurrentUser(undefined);
        navigate('/');
        setDialogOpen({ isOpen: false, type: null });
        console.log('Succeeded in sign out');
      } else {
        console.log('Failed in sign out');
      }
    } catch (error) {
      console.log(error);
    }
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
      <Card sx={{ m: 3, boxShadow: 'none' }}>
        <CardHeader title="ログアウトしますか?" sx={{ align: 'center' }} />
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: '9999px' }}
            onClick={(e) => void handleSignOut(e)}
          >
            <Typography>ログアウト</Typography>
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ borderRadius: '9999px' }}
            onClick={() => setDialogOpen({ isOpen: false, type: null })}
          >
            <Typography>キャンセル</Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default LogoutDialog;
