import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { currentUserState, isSignedInState } from '../../atoms/authAtoms';
import { signOut } from '../../api/auth';

const LogOutButton = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signOutMutation = useMutation(() => signOut(), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');
        setCurrentUser(undefined);
        setIsSignedIn(false);
        queryClient.invalidateQueries('currentUser');
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
    <Button variant="contained" color="primary" onClick={() => handleSignOut()}>
      ログアウト
    </Button>
  );
};

export default LogOutButton;
