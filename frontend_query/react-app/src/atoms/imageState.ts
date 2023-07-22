import { atom, selector } from 'recoil'

export const imageState = atom({
  key: 'imageState',
  default: [] as File[],
});

export const imageActions = selector({
  key: 'imageActions',
  get: ({ get }) => get(imageState),
  set: ({ set }, newValue) => set(imageState, newValue),
});