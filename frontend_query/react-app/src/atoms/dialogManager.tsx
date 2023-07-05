import { useRecoilValue } from 'recoil';
import { dialogState } from './dialogState';
import LoginDialog from '../components/auth/LoginDialog';
import LogoutDialog from '../components/auth/LogoutDialog';
import SignupDialog from '../components/auth/SignupDialog';
import React from 'react';

const DialogManager: React.FC = () => {
  const dialogOpen = useRecoilValue(dialogState);
  switch (dialogOpen.type) {
    case 'login':
      return <LoginDialog />;
    case 'logout':
      return <LogoutDialog />;
    case 'signup':
      return <SignupDialog />;
    default:
      return null;
  }
};

export default DialogManager;
