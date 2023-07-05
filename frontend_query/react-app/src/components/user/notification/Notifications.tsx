import NotificationsList from './NotificationsList';
import { useNotifications } from '../../../hooks/notification/useNotifications';
import { useNotificationsCount } from '../../../hooks/notification/useNotificationsCount';

import { List } from '@mui/material';

const Notifications = () => {
  const { notifications, isLoading, error } = useNotifications();
  const notificationsCount = useNotificationsCount();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  console.log(notifications);
  console.log(notificationsCount);
  return (
    <>
      {notifications?.map((notification: any) => (
        <List key={notification.id}>
          <NotificationsList notification={notification} />
        </List>
      ))}
    </>
  );
};

export default Notifications;
