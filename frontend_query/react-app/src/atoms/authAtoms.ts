import { atom } from 'recoil'

export const currentUserState = atom({
  key: 'currentUserState',
  default: undefined,
});

export const isSignedInState = atom({
  key: 'isSignedInState',
  default: false,
});