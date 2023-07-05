import { atom } from 'recoil'

export const currentUserState = atom({
  key: 'currentUserState',
  default: undefined,
});

export const isSignedInState = atom({
  key: 'isSignedInState',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem('isSignedInState');

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (!newValue) {
          localStorage.removeItem('isSignedInState');
        } else {
          localStorage.setItem('isSignedInState', JSON.stringify(newValue));
        }
      });
    },
  ],
});