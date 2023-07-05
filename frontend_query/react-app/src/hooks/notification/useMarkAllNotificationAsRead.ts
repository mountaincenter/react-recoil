import { useMutation, useQueryClient } from "react-query";
import { markAllNotificationAsRead } from "../../api/notification";

export const useMarkAllNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => markAllNotificationAsRead(), {
    onSuccess: () => {
      queryClient.invalidateQueries('notifications')
    },
    onError: (error) => {
      console.log(error)
    }
  });
  return mutation;
}