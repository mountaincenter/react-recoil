import {
  Box,
  List,
  Button,
  Typography,
  useMediaQuery,
  Tooltip,
  IconButton,
  Dialog,
} from '@mui/material';

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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import BreakpointsTheme from '../theme';

import { useRecoilState } from 'recoil';
import { dialogState } from '../atoms/dialogState';
import DialogManager from '../atoms/dialogManager';

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  const markAllNotificationAsRead = useMarkAllNotificationAsRead();
  const isTablet = useMediaQuery(
    BreakpointsTheme.breakpoints.between('tablet', 'desktop')
  );
  const isMobile = useMediaQuery(BreakpointsTheme.breakpoints.down('tablet'));

  const menuItems = [
    {
      link: '/',
      text: 'Home',
      Icon: { HomeIcon },
      OutlinedIcon: { HomeOutlinedIcon },
    },
    {
      link: '/explore',
      text: 'Search',
      Icon: { SearchIcon },
      OutlinedIcon: { SearchIcon },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100svh',
        postion: 'fixed',
        minWidth: {
          desktop: 259,
          laptop: 72,
          tablet: 'none',
        },
        overflow: 'hidden',
        px: 2,
      }}
    >
      <List
        sx={{
          flexGrow: 1,
          pt: 2,
          minWidth: { desktop: 259, laptop: 72, tablet: 'none', mobile: 259 },
        }}
      >
        <SidebarOption
          link="/"
          text="Home"
          Icon={HomeIcon}
          OutlinedIcon={HomeOutlinedIcon}
        />
        <SidebarOption
          link="/explore"
          text="Search"
          Icon={SearchIcon}
          OutlinedIcon={SearchIcon}
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
            <SidebarOption
              link={'/bookmarks'}
              text="Bookmarks"
              Icon={BookmarkIcon}
              OutlinedIcon={BookmarkBorderIcon}
            />
            {!isTablet ? (
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ borderRadius: '9999px', mt: 2 }}
                onClick={() => setDialogOpen({ isOpen: true, type: 'post' })}
              >
                <Typography>ツイートする</Typography>
              </Button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Tooltip title="ツイート">
                  <IconButton size="large">
                    <AddCircleIcon
                      color="primary"
                      onClick={() =>
                        setDialogOpen({ isOpen: true, type: 'post' })
                      }
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </>
        )}
        <Dialog
          open={dialogOpen.isOpen}
          onClose={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <DialogManager />
        </Dialog>
      </List>
      {!isMobile && <SidebarFooter />}
    </Box>
  );
};

export default Sidebar;
