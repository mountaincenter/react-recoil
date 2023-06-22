import React from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogState } from 'components/recoil/DialogState';
import { isSignedInState } from 'components/recoil/States/AuthState';
import DialogManager from 'components/recoil/DialogManager';

const AuthAppBar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  const isSignedIn = useRecoilValue(isSignedInState);
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          bottom: 0,
          top: 'auto',
          height: '72px',
          backgroundColor: '#50b7f5',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              flexGrow: 1,
              textAlign: 'center',
            }}
          >
            Todo App
          </Typography>
          {!isSignedIn ? (
            <>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: '#50b7f5',
                  color: 'white',
                  border: '1px solid #e6ecf0',
                  borderRadius: '9999px',
                  marginLeft: 'auto',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#71c2f8',
                    boxShadow: 'none',
                  },
                  fontWeight: 'bold',
                }}
                onClick={() => setDialogOpen({ isOpen: true, type: 'login' })}
              >
                ログイン
              </Button>
              <Button
                variant="contained"
                color="inherit"
                sx={{
                  backgroundColor: '#f5f8fa',
                  fontWeight: 'bold',
                  borderRadius: '9999px',
                  marginLeft: '10px',
                  boxShadow: 'none',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#e6ecf0',
                    boxShadow: 'none',
                  },
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
          ) : (
            <>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: '#50b7f5',
                  color: 'white',
                  border: '1px solid #e6ecf0',
                  borderRadius: '9999px',
                  marginLeft: 'auto',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#71c2f8',
                    boxShadow: 'none',
                  },
                  fontWeight: 'bold',
                }}
                onClick={() => setDialogOpen({ isOpen: true, type: 'logout' })}
              >
                ログアウト
              </Button>
              <Dialog
                open={dialogOpen.isOpen}
                onClose={() => setDialogOpen({ isOpen: false, type: null })}
              >
                <DialogManager />
              </Dialog>
            </>
          )}
          {/* <>
            <Button
              color="inherit"
              variant="contained"
              sx={{
                backgroundColor: '#50b7f5',
                color: 'white',
                border: '1px solid #e6ecf0',
                borderRadius: '9999px',
                marginLeft: 'auto',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#71c2f8',
                  boxShadow: 'none',
                },
                fontWeight: 'bold',
              }}
              onClick={() => setDialogOpen({ isOpen: true, type: 'login' })}
            >
              ログイン
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: '#f5f8fa',
                fontWeight: 'bold',
                borderRadius: '9999px',
                marginLeft: '10px',
                boxShadow: 'none',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#e6ecf0',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setDialogOpen({ isOpen: true, type: 'signup' })}
            >
              アカウント作成
            </Button>
            <Button
              color="inherit"
              variant="contained"
              sx={{
                backgroundColor: '#50b7f5',
                color: 'white',
                border: '1px solid #e6ecf0',
                borderRadius: '9999px',
                marginLeft: 'auto',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#71c2f8',
                  boxShadow: 'none',
                },
                fontWeight: 'bold',
              }}
              onClick={() => setDialogOpen({ isOpen: true, type: 'logout' })}
            >
              ログアウト
            </Button>
            <Dialog
              open={dialogOpen.isOpen}
              onClose={() => setDialogOpen({ isOpen: false, type: null })}
            >
              <DialogManager />
            </Dialog>
          </> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AuthAppBar;
