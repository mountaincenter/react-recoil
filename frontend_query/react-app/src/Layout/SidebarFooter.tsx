import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import { isSignedInState } from '../atoms/authAtoms';
import { useRecoilValue } from 'recoil';
import { UserAvatar } from '../components/common/UserAvatar';

import { useRecoilState } from 'recoil';
import { dialogState } from '../atoms/dialogState';
import DialogManager from '../atoms/dialogManager';

const SidebarFooter = () => {
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  const { currentUser } = useCurrentUser();
  const isSignedIn = useRecoilValue<boolean>(isSignedInState);

  return (
    isSignedIn && (
      <>
        <ListItem sx={{ borderTop: '1px solid #d3d4d5', mt: 'auto' }}>
          <ListItemAvatar>
            <UserAvatar
              pathname={currentUser?.username ? currentUser.username : ''}
              name={currentUser?.name ? currentUser.name : ''}
              avatar={currentUser?.avatar ? currentUser.avatar : { url: '' }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={currentUser?.name}
            secondary={currentUser?.username}
          />
          <IconButton>
            <MoreHorizIcon
              onClick={() => setDialogOpen({ isOpen: true, type: 'logout' })}
            />
          </IconButton>
        </ListItem>
        <Dialog
          open={dialogOpen.isOpen}
          onClose={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <DialogManager />
        </Dialog>
      </>
    )
  );
};

export default SidebarFooter;
