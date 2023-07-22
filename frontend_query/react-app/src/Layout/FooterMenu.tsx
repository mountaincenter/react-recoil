import { BottomNavigation } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MessageIcon from '@mui/icons-material/Message';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SearchIcon from '@mui/icons-material/Search';

import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';

import FootNavOption from './FootNavOption';

const FooterMenu = () => {
  const { currentUser } = useCurrentUser();
  const menuItems = [
    {
      link: '/',
      text: 'Home',
      Icon: HomeIcon,
      OutlinedIcon: HomeOutlinedIcon,
    },
    {
      link: '/explore',
      text: 'Explore',
      Icon: SearchIcon,
      OutlinedIcon: SearchIcon,
    },
    {
      link: `/${currentUser?.username}/notifications`,
      text: 'Notifications',
      Icon: NotificationsIcon,
      OutlinedIcon: NotificationsOutlinedIcon,
    },
    {
      link: '/messages',
      text: 'Messages',
      Icon: MessageIcon,
      OutlinedIcon: MessageOutlinedIcon,
    },
  ];
  return (
    <BottomNavigation
      style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}
    >
      {menuItems.map((item, index) => (
        <FootNavOption
          key={index}
          link={item.link}
          text={item.text}
          Icon={item.Icon}
          OutlinedIcon={item.OutlinedIcon}
        />
      ))}
    </BottomNavigation>
  );
};

export default FooterMenu;
