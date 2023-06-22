import React, { useRef } from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Card,
  CardContent,
  Button,
  TextField,
} from '@mui/material';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dialogState } from 'components/recoil/DialogState';

import { createTodo } from 'lib/api/todos';

import { todoListState } from 'components/recoil/States/todoState';
import {
  currentUserState,
  isSignedInState,
} from 'components/recoil/States/AuthState';

import { type Todo } from 'interfaces';

const AddTodoDialog = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setDialogOpen = useSetRecoilState(dialogState);
  const setTodos = useSetRecoilState(todoListState);
  const currentUser = useRecoilValue(currentUserState);
  const isSignedIn = useRecoilValue(isSignedInState);

  const handleCreateTodo = async (title: string, userId: number | null) => {
    const newTodo = await createTodo(title, userId ? userId : 0);
    if (newTodo) {
      setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      handleCreateTodo(inputValue, currentUser?.id ?? null);
      inputRef.current.value = '';
      setDialogOpen({ isOpen: false, type: null });
    }
  };

  console.log(isSignedIn);

  return (
    <>
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
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Card
              sx={{
                boxShadow: 'none',
              }}
            >
              <CardContent>
                <TextField
                  inputRef={inputRef}
                  variant="standard"
                  label="Add Todo"
                  required
                  fullWidth
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{
                    marginTop: 5,
                    flexGrow: 1,
                    textTransform: 'none',
                    borderRadius: '9999px',
                    marginLeft: 'auto',
                  }}
                >
                  Add Todo
                </Button>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </>
    </>
  );
};

export default AddTodoDialog;
