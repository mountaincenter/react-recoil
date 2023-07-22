import React from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  Typography,
  Badge,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useNotificationsCount } from '../hooks/notification/useNotificationsCount';
import BreakpointsTheme from '../theme';

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
  const isDesktop = useMediaQuery(BreakpointsTheme.breakpoints.up('desktop'));
  const isTablet = useMediaQuery(
    BreakpointsTheme.breakpoints.between('tablet', 'desktop')
  );
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
        width: isDesktop ? 'auto' : '48px',
        height: isDesktop ? 'auto' : '48px',
        '&:hover': {
          borderRadius: isDesktop ? '9999px' : '50%',
        },
      }}
    >
      <Tooltip title={text} disableHoverListener={isDesktop}>
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
              <div className="icon-container">
                <IconToRender />
              </div>
            </ListItemIcon>
          </Badge>
        ) : (
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <div className="icon-container">
              <IconToRender />
            </div>
          </ListItemIcon>
        )}
      </Tooltip>
      {!isTablet && (
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
