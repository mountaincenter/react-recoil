import { client } from "./client";
import { auth } from "./auth";

export const getNotifications = async(): Promise<any> => {
  return await client.get('/notifications', auth);
}

export const markAllNotificationAsRead = async(): Promise<any> => {
  return await client.put('/notifications/mark_all_as_read', {}, auth);
}