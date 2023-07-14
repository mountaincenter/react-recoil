import { type AxiosResponse } from 'axios';
import { client } from './client';
import { auth } from "./auth"
import { type UserUpdateData } from 'interfaces';

export const getUsers = async (): Promise<AxiosResponse> => {
  return client.get('/users', auth
  );
}

export const getUser = async (username: string): Promise<AxiosResponse> => {
  return client.get(`/users/${username}`, auth)
}

export const updateUser = async (username: string, data: UserUpdateData): Promise<AxiosResponse> => {
  return client.put(`/users/${username}`, data, auth)
}