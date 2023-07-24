import { type AxiosResponse } from "axios";
import { client } from "./client";
import { getAuth } from "./auth";

export const getNotifications = async(): Promise<AxiosResponse> => {
  return await client.get('/notifications', getAuth());
}

export const markAllNotificationAsRead = async(): Promise<AxiosResponse> => {
  return await client.put('/notifications/mark_all_as_read', {}, getAuth());
}