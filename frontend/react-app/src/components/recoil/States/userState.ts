import { atomFamily, selectorFamily } from 'recoil';
import client, { auth } from 'lib/api/client';

import { User } from "interfaces";

const fetchUser = async (path: string): Promise<User> => {
  try {
    const response = await client.get(path, auth);
    return response.data as User;
  } catch {
    throw new Error('データの取得に失敗しました');
  }
}

const fetchUsers = async (path: string): Promise<User[]> => {
  try {
    const response = await client.get(path, auth);
    return response.data as User[];
  } catch {
    throw new Error('データの取得に失敗しました');
  }
}

export const userStateFamily = atomFamily<User | undefined, string>({
  key: 'userStateFamily',
  default: (username: string) => fetchUser(`/users/${username}`),
});

export const followersStateFamily = atomFamily<User[] | undefined, string>({
  key: 'followersStateFamily',
  default: (username: string) => fetchUsers(`/users/${username}/followers`),
});

export const followingStateFamily = atomFamily<User[] | undefined, string>({
  key: 'followingStateFamily',
  default: (username: string) => fetchUsers(`users/${username}/following`),
});

export const followersCountStateFamily = selectorFamily<number, string>({
  key: 'followersCountStateFamily',
  get:
    (username: string) =>
    ({ get }) => {
      const followers = get(followersStateFamily(username));
      return followers ? followers.length : 0;
    },
});

export const followingCountState = selectorFamily<number, string>({
  key: 'followingCountStateFamily',
  get:
    (username: string) =>
    ({ get }) => {
      const following = get(followingStateFamily(username));
      return following ? following.length : 0;
    },
});