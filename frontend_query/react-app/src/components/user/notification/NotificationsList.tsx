import {
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { UserAvatar } from '../../common/UserAvatar';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
const NotificationsList = ({ notification }: any) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemIcon>
          {notification.notifiableType === 'Message' ? (
            <MessageIcon />
          ) : (
            <PersonIcon color="primary" />
          )}
        </ListItemIcon>
        <Box display="flex" flexDirection="column">
          <ListItemAvatar>
            {notification.notifiableType === 'Message' ? (
              <UserAvatar
                name={notification.notifiable.sender.name}
                avatar={notification.notifiable.sender.avatar}
                pathname={notification.notifiable.sender.username}
              />
            ) : (
              <UserAvatar
                name={notification.notifiable.follower.name}
                avatar={notification.notifiable.follower.avatar}
                pathname={notification.notifiable.follower.username}
              />
            )}
          </ListItemAvatar>
          {notification.notifiableType === 'Message' ? (
            <ListItemText
              primary={notification.message}
              secondary={notification.notifiable.body}
            />
          ) : (
            <ListItemText primary={notification.message}></ListItemText>
          )}
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default NotificationsList;
