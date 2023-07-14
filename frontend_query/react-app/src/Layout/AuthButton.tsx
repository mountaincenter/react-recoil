import { Button, Dialog } from '@mui/material';
import { isSignedInState } from 'atoms/authAtoms';
import { useRecoilValue, useRecoilState } from 'recoil';

import DialogManager from 'atoms/dialogManager';
import { dialogState } from 'atoms/dialogState';

const AuthButton = (): JSX.Element => {
  const isSignedIn = useRecoilValue<boolean>(isSignedInState);
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);

  if (!isSignedIn) {
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
            ml: 2,
            mr: 2,
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
            ml: 2,
            mr: 2,
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
