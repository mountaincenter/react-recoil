import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isSignedInState } from '../../atoms/authAtoms';
import { signOut } from '../../api/auth';

const LogOutButton = () => {
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
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleSignOut()}
      sx={{
        fontWeight: 'bold',
        border: '1px solid #e6ecf0',
        borderRadius: '9999px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#e6ecf0',
          boxShadow: 'none',
        },
      }}
    >
      ログアウト
    </Button>
  );
};

export default LogOutButton;
