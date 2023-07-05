import { client } from './client';
import { auth } from "./auth"
import { type UserUpdateData } from 'interfaces';

export const getUsers = async (): Promise<any> => {
  return client.get('/users', auth
  );
}

export const getUser = async (username: string): Promise<any> => {
  return client.get(`/users/${username}`, auth)
}

export const updateUser = async (username: string, data: UserUpdateData): Promise<any> => {
  return client.put(`/users/${username}`, data, auth)
}