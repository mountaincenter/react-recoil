import { type AxiosResponse } from "axios";
import { client } from "./client";
import { auth } from "./auth";

export const getNotifications = async(): Promise<AxiosResponse> => {
  return await client.get('/notifications', auth);
}

export const markAllNotificationAsRead = async(): Promise<AxiosResponse> => {
  return await client.put('/notifications/mark_all_as_read', {}, auth);
}