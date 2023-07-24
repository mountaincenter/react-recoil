import { type AxiosResponse } from 'axios';
import { client } from './client';
import { getAuth } from "./auth"
import { type UserUpdateData } from 'interfaces';

export const getUsers = async (): Promise<AxiosResponse> => {
  return client.get('/users', getAuth()
  );
}

export const getUser = async (username: string): Promise<AxiosResponse> => {
  return client.get(`/users/${username}`, getAuth())
}

export const updateUser = async (username: string, data: UserUpdateData): Promise<AxiosResponse> => {
  return client.put(`/users/${username}`, data, getAuth())
}