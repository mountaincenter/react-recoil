import { atom } from 'recoil';
import { type User } from 'interfaces';

export const isSignedInState = atom<boolean>({
  key: 'isSignedInState',
  default: false,
})


export const currentUserState = atom<User | undefined> ({
  key: 'currentUserState',
  default: undefined
})