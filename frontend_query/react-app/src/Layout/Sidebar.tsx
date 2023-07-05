import { List } from '@mui/material';
import { Box } from '@mui/material';

import SidebarOption from './SidebarOption';
import SidebarFooter from './SidebarFooter';

import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import { useMarkAllNotificationAsRead } from 'hooks/notification/useMarkAllNotificationAsRead';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MessageIcon from '@mui/icons-material/Message';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const markAllNotificationAsRead = useMarkAllNotificationAsRead();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100svh',
        postion: 'fixed',
      }}
    >
      <List sx={{ flexGrow: 1, pt: 2 }}>
        <SidebarOption
          link="/"
          text="Home"
          Icon={HomeIcon}
          OutlinedIcon={HomeOutlinedIcon}
        />
        {currentUser && (
          <>
            <SidebarOption
              link={`/${currentUser?.username}`}
              text="Profile"
              Icon={PersonIcon}
              OutlinedIcon={PersonOutlinedIcon}
            />
            <SidebarOption
              link={`/${currentUser?.username}/notifications`}
              text="Notifications"
              Icon={NotificationsIcon}
              OutlinedIcon={NotificationsOutlinedIcon}
              onClick={markAllNotificationAsRead.mutate}
            />
            <SidebarOption
              link={'/messages'}
              text="Messages"
              Icon={MessageIcon}
              OutlinedIcon={MessageOutlinedIcon}
            />
          </>
        )}
      </List>
      <SidebarFooter />
    </Box>
  );
};

export default Sidebar;
