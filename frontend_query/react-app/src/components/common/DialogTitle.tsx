import { DialogTitle, IconButton } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useSetRecoilState } from 'recoil';
import { dialogState } from '../../atoms/dialogState';

export const DialogTitleComponent = () => {
  const setDialogOpen = useSetRecoilState(dialogState);

  return (
    <>
      <DialogTitle>
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', left: 10, top: 10 }}
          onClick={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <ClearOutlinedIcon />
        </IconButton>
      </DialogTitle>
    </>
  );
};
