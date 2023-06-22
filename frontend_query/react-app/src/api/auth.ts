import { client } from './client';
import { type SignInData } from 'interfaces';
import Cookies from 'js-cookie';

export const signIn = async (data: SignInData): Promise<any> => {
  return await client.post('/auth/sign_in', data);
};

export const signOut = async (): Promise<any> => {
  return await client.delete('/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
