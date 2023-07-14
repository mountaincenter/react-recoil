import {
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ReplyIcon from '@mui/icons-material/Reply';

import { type Notification } from 'interfaces';

const getIconForNotificationType = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageIcon />;
    case 'follow':
      return <PersonIcon />;
    case 'like':
      return <FavoriteIcon />;
    case 'mention':
      return <AlternateEmailIcon />;
    case 'reply':
      return <ReplyIcon />;
    default:
      return null;
  }
};

const NotificationsList = ({
  notification,
}: {
  notification: Notification;
}) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemIcon>
          {getIconForNotificationType(notification.notificationType)}
        </ListItemIcon>
        <Box alignItems="center">
          <Box display="flex">
            <ListItemAvatar>
              <Avatar src={notification.message.avatar.url} />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1">
                {notification.message.name}
              </Typography>
            </ListItemText>
          </Box>
          <ListItemText>
            <Typography variant="body2" color="textSecondary">
              {notification.message.body}
            </Typography>
          </ListItemText>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default NotificationsList;
