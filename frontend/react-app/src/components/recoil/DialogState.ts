import { atom } from 'recoil';
import { type DialogState } from 'interfaces';

export const dialogState = atom<DialogState>({
  key: 'dialogState',
  default: { isOpen: false, type: null}
})