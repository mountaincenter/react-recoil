import React from 'react';
import { IconButton, Dialog } from '@mui/material';
import { useRecoilState } from 'recoil';
import DialogManager from 'components/recoil/DialogManager';
import { dialogState } from 'components/recoil/DialogState';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreateTodo = () => {
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  return (
    <>
      <IconButton
        onClick={() => setDialogOpen({ isOpen: true, type: 'addTodo' })}
      >
        <AddCircleIcon fontSize="large" color="primary" />
      </IconButton>
      <Dialog
        open={dialogOpen.isOpen}
        onClose={() => setDialogOpen({ isOpen: true, type: null })}
      >
        <DialogManager />
      </Dialog>
    </>
  );
};

export default CreateTodo;
