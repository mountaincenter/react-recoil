import { useRecoilValue } from 'recoil';
import { dialogState } from './dialogState';
import LoginDialog from '../components/auth/LoginDialog';
import LogoutDialog from '../components/auth/LogoutDialog';
import SignupDialog from '../components/auth/SignupDialog';
import ReplyDialog from '../components/post/ReplyDialog';
import EditDialog from '../components/post/EditDialog';
import PostDialog from '../components/post/PostDialog';
import React from 'react';
import { type DialogProps, type ReplyProps } from 'interfaces';

function isReplyProps(props: DialogProps): props is ReplyProps {
  return 'publicId' in props;
}

const DialogManager: React.FC = () => {
  const dialogOpen = useRecoilValue(dialogState);
  switch (dialogOpen.type) {
    case 'login':
      return <LoginDialog />;
    case 'logout':
      return <LogoutDialog />;
    case 'signup':
      return <SignupDialog />;
    case 'reply':
      return dialogOpen.props && isReplyProps(dialogOpen.props) ? (
        <ReplyDialog publicId={dialogOpen.props.publicId} />
      ) : null;
    case 'edit':
      return <EditDialog />;
    case 'post':
      return <PostDialog />;
    default:
      return null;
  }
};

export default DialogManager;
