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

import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';

import { useMarkAllNotificationAsRead } from './notification/useMarkAllNotificationAsRead';

interface MenuItem {
  link: string;
  text: string;
  Icon: React.ElementType;
  OutlinedIcon: React.ElementType;
  onClick?: () => void;
}

type UseMenuItems = () => MenuItem[];

const useMenuItems: UseMenuItems = () => {
  const { currentUser } = useCurrentUser();
  const markAllNotificationAsRead = useMarkAllNotificationAsRead();

  const basicItems = [
    {
      link: '/',
      text: 'Home',
      Icon: HomeIcon,
      OutlinedIcon: HomeOutlinedIcon,
    },
    {
      link: '/explore',
      text: 'Search',
      Icon: SearchIcon,
      OutlinedIcon: SearchIcon,
    },
  ];

  const userItems = currentUser
    ? [
        {
          link: `/${currentUser.username}`,
          text: 'Profile',
          Icon: PersonIcon,
          OutlinedIcon: PersonOutlinedIcon,
        },
        {
          link: `/${currentUser.username}/notifications`,
          text: 'Notifications',
          Icon: NotificationsIcon,
          OutlinedIcon: NotificationsOutlinedIcon,
          onClick: markAllNotificationAsRead,
        },
        {
          link: `/messages`,
          text: 'Messages',
          Icon: MessageIcon,
          OutlinedIcon: MessageOutlinedIcon,
        },
        {
          link: `/bookmarks`,
          text: 'Bookmarks',
          Icon: BookmarkIcon,
          OutlinedIcon: BookmarkBorderIcon,
        },
      ]
    : [];

  return [...basicItems, ...userItems];
};

export default useMenuItems;
