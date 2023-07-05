import { useQuery } from "react-query";
import { getNotifications } from "../../api/notification";
import { type Notification, type ApiResponse } from "interfaces";

export const useNotifications = () => {
  const {data, isLoading, error} = useQuery<ApiResponse<Notification[]>, Error>({
    queryKey: ['notifications'],
    queryFn: () => getNotifications()
  });
  const notifications = data?.data
  return { notifications, isLoading, error}
}