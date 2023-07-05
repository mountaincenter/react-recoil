import React from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
  Typography,
  Badge,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useNotificationsCount } from '../hooks/notification/useNotificationsCount';

interface SidebarOptionProps {
  link: string;
  text: string;
  Icon?: React.ElementType;
  OutlinedIcon: React.ElementType;
  onClick?: () => void;
}

const SidebarOption = ({
  link,
  text,
  Icon,
  OutlinedIcon,
  onClick,
}: SidebarOptionProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isMiddleScreen = useMediaQuery(theme.breakpoints.up('md'));
  const notificationsCount = useNotificationsCount();

  const isActive = location.pathname === link;
  const IconToRender = isActive && Icon ? Icon : OutlinedIcon;
  return (
    <ListItemButton
      component={Link}
      to={link}
      onClick={onClick}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: isActive ? 'bold' : 'normal',
      }}
    >
      <Tooltip title={text} disableHoverListener={isMiddleScreen}>
        {text === 'Notifications' && notificationsCount > 0 ? (
          <Badge
            badgeContent={notificationsCount}
            color="primary"
            max={99}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <ListItemIcon>
              <IconToRender />
            </ListItemIcon>
          </Badge>
        ) : (
          <ListItemIcon>
            <IconToRender />
          </ListItemIcon>
        )}
      </Tooltip>
      {isMiddleScreen && (
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{ fontWeight: isActive ? 'bold' : 'normal' }}
            >
              {text}
            </Typography>
          }
        />
      )}
    </ListItemButton>
  );
};

export default SidebarOption;
