import { useNotifications} from "./useNotifications";

export const useNotificationsCount = () => {
  const { notifications } = useNotifications();

  if (!notifications) {
    return 0;
  }

  const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;

  return unreadNotificationsCount;
}