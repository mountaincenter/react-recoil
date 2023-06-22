import { useQuery, useMutation, useQueryClient } from 'react-query';

import client from './client';
import Cookies from 'js-cookie';

import { type SignUpData, type SignInData } from 'interfaces';

interface AuthHeaders {
  headers: {
    'access-token': string;
    client: string;
    uid: string;
  }
}

export const auth: AuthHeaders = {
  headers: {
    'access-token': Cookies.get('_access_token') ?? '',
    client: Cookies.get('_client') ?? '',
    uid: Cookies.get('_uid') ?? '',
  }
};


// サインアップ（アカウント新規作成）
export const signUp = async (data: SignUpData): Promise<any> => {
  return await client.post('auth', data);
};

// サインイン（ログイン）
export const signIn = async (data: SignInData): Promise<any> => {
  return await client.post('auth/sign_in', data);
};

// サインアウト（ログアウト）
export const signOut = async (): Promise<any> => {
  console.log(auth)
  return await client.delete('auth/sign_out', auth);
};


export const useGetCurrentUser = () => {
  return useQuery('currentUser', async () => {
    const response = await client.get('auth/sessions', auth);
    console.log(response.data)
    return response.data;
  });
}

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation((data: SignInData) => signIn(data), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.set('_access_token', data.headers['access-token'] ?? '');
        Cookies.set('_client', data.headers.client ?? '');
        Cookies.set('_uid', data.headers.uid ?? '');
        queryClient.setQueryData('currentUser', data);
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });
}