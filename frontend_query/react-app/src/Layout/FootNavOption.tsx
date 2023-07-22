import React from 'react';
import { BottomNavigationAction, Badge, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNotificationsCount } from 'hooks/notification/useNotificationsCount';
import Theme from '../theme';

interface FootNavOptionProps {
  link: string;
  text: string;
  Icon: React.ElementType;
  OutlinedIcon: React.ElementType;
  onClick?: () => void;
}

const FootNavOption = ({
  link,
  text,
  Icon,
  OutlinedIcon,
  onClick,
}: FootNavOptionProps) => {
  const location = useLocation();
  const notificationsCount = useNotificationsCount();
  const isMobile = useMediaQuery(Theme.breakpoints.down('tablet'));
  const isActive = location.pathname === link;

  const IconToRender = isActive ? Icon : OutlinedIcon;

  return (
    <BottomNavigationAction
      component="a"
      href={link}
      label={text}
      onClick={onClick}
      icon={
        text === 'Notifications' && notificationsCount > 0 ? (
          <Badge
            badgeContent={notificationsCount}
            color="primary"
            max={99}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <IconToRender />
          </Badge>
        ) : (
          <IconToRender />
        )
      }
    ></BottomNavigationAction>
  );
};

export default FootNavOption;
