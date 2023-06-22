import { useRecoilValue } from 'recoil';
import { dialogState } from './DialogState';
import AddTodoDialog from 'components/todos/AddTodoDialog';
import LoginDialog from 'components/utils/dialogs/LoginDialog';
import SignupDialog from 'components/utils/dialogs/SignupDialog';
import LogoutDialog from 'components/utils/dialogs/LogoutDialog';

const DialogManager: React.FC = () => {
  const dialogOpen = useRecoilValue(dialogState);

  switch (dialogOpen.type) {
    case 'addTodo':
      return <AddTodoDialog />;
    case 'login':
      return <LoginDialog />;
    case 'signup':
      return <SignupDialog />;
    case 'logout':
      return <LogoutDialog />;
    default:
      return null;
  }
};

export default DialogManager;
