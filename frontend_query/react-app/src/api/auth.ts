import { type AxiosResponse } from 'axios';
import { client } from './client';
import { type SignInData, type SignUpData } from 'interfaces';
import Cookies from 'js-cookie';

export const auth = {
  headers: {
    'access-token': Cookies.get('_access_token'),
    client: Cookies.get('_client'),
    uid: Cookies.get('_uid'),
  }
}

export const signIn = async (data: SignInData): Promise<AxiosResponse> => {
  return await client.post('/auth/sign_in', data);
};

export const signUp = async (data: SignUpData): Promise<AxiosResponse> => {
  return await client.post('/auth', data);
}

export const signOut = async (): Promise<AxiosResponse> => {
  return await client.delete('/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
