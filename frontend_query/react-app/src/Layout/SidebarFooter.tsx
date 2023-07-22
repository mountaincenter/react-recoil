import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  useMediaQuery,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import { UserAvatar } from '../components/common/UserAvatar';

import { useRecoilState } from 'recoil';
import { dialogState } from '../atoms/dialogState';
import DialogManager from '../atoms/dialogManager';

import theme from '../theme';

const SidebarFooter = () => {
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  const { currentUser } = useCurrentUser();

  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  return (
    currentUser && (
      <>
        <ListItem
          sx={{
            borderTop: '1px solid #d3d4d5',
            mt: 'auto',
          }}
        >
          {isDesktop ? (
            <>
              <ListItemAvatar
                sx={{
                  justifyContent: 'center',
                }}
              >
                <UserAvatar
                  to={currentUser?.username ? currentUser.username : ''}
                  name={currentUser?.name ? currentUser.name : ''}
                  avatar={
                    currentUser?.avatar ? currentUser.avatar : { url: '' }
                  }
                  component="Link"
                />
              </ListItemAvatar>
              <ListItemText
                primary={currentUser?.name}
                secondary={currentUser?.username}
              />
              <IconButton>
                <MoreHorizIcon
                  onClick={() =>
                    setDialogOpen({ isOpen: true, type: 'logout' })
                  }
                />
              </IconButton>
            </>
          ) : (
            <>
              <ListItemAvatar
                sx={{
                  justifyContent: 'center',
                }}
              >
                <UserAvatar
                  name={currentUser?.name ? currentUser.name : ''}
                  avatar={
                    currentUser?.avatar ? currentUser.avatar : { url: '' }
                  }
                  onClick={() =>
                    setDialogOpen({ isOpen: true, type: 'logout' })
                  }
                  component="button"
                />
              </ListItemAvatar>
            </>
          )}
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
