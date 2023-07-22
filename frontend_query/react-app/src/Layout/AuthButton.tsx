import { Button, Dialog } from '@mui/material';
import { useRecoilState } from 'recoil';

import DialogManager from 'atoms/dialogManager';
import { dialogState } from 'atoms/dialogState';
import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';
import { getCurrentUser } from 'hooks/currentUser/getCurrentUser';
import { guestSignIn } from 'api/auth';

import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const AuthButton = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleGuestSignIn = async () => {
    try {
      await guestSignIn();
      const currentUser = await getCurrentUser();
      queryClient.invalidateQueries('currentUser');
      navigate('/');
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          sx={{
            border: '1px solid #e6ecf0',
            borderRadius: '9999px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#71c2f8',
              boxShadow: 'none',
            },
            fontWeight: 'bold',
            mx: 1,
          }}
          onClick={handleGuestSignIn}
        >
          簡単ログイン
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{
            border: '1px solid #e6ecf0',
            borderRadius: '9999px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#71c2f8',
              boxShadow: 'none',
            },
            fontWeight: 'bold',
            mx: 1,
          }}
          onClick={() => setDialogOpen({ isOpen: true, type: 'login' })}
        >
          ログイン
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{
            border: '1px solid #e6ecf0',
            borderRadius: '9999px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#71c2f8',
              boxShadow: 'none',
            },
            fontWeight: 'bold',
            mx: 1,
          }}
          onClick={() => setDialogOpen({ isOpen: true, type: 'signup' })}
        >
          アカウント作成
        </Button>
        <Dialog
          open={dialogOpen.isOpen}
          onClose={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <DialogManager />
        </Dialog>
      </>
    );
  } else {
    return <></>;
  }
};

export default AuthButton;
