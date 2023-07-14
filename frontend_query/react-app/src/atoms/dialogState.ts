import { atom } from 'recoil';
import { type DialogState, type DialogProps } from 'interfaces';

export const dialogState = atom<DialogState<DialogProps>>({
  key: 'dialogState',
  default: { isOpen: false, type: null, props: {}}
})