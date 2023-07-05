import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useCurrentUser } from '../../hooks/currentUser/useCurrentUser';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Box,
} from '@mui/material';

import { type UserUpdateData } from 'interfaces';
import { updateUser } from '../../api/user';

import { Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export interface UpdateUserFormData extends FormData {
  append: (
    name: keyof UserUpdateData,
    value: string | Blob,
    fileName?: string
  ) => void;
}

const UserEdit = () => {
  const { currentUser, isLoading, error } = useCurrentUser();
  const [formData, setFormData] = useState<UserUpdateData>({});
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [avatar, setAvatar] = useState<string | undefined>(
    currentUser?.avatar.url || undefined
  );
  const navigate = useNavigate();
  // console.log(currentUser);
  console.log(avatar);

  const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation(
      (data: { username: string; data: UserUpdateData }) =>
        updateUser(data.username, data.data),
      {
        onSuccess: (data, variable) => {
          queryClient.setQueryData(['user', variable.username], data);
          navigate(`/${variable.username}`);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const updateUserMutation = useUpdateUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name || currentUser.name || '');
    submitData.append(
      'username',
      formData.username || currentUser.username || ''
    );
    submitData.append(
      'profile',
      formData.profile || currentUser.username || ''
    );
    if (avatarFile) {
      submitData.append('avatar', avatarFile, avatarFile.name);
    }
    updateUserMutation.mutate({
      username: currentUser.username,
      data: submitData as any,
    });
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <Grid item xs={12}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Card sx={{ padding: 2, maxWidth: 400 }}>
            <CardHeader sx={{ textAlign: 'center' }} title="プロフィール編集" />
            <CardContent>
              <Box justifyContent="center" textAlign="center">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" component="span">
                    <Avatar
                      src={avatar}
                      sx={{ width: 80, height: 80, position: 'relative' }}
                    />
                    <PhotoCamera
                      sx={{
                        position: 'absolute',
                        right: '10px',
                        bottom: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        color: 'grey.500',
                      }}
                    />
                  </IconButton>
                </label>
              </Box>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="name"
                label="Name"
                defaultValue={currentUser?.name}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="username"
                label="Username"
                defaultValue={currentUser?.username}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                multiline
                name="profile"
                label="Profile"
                defaultValue={
                  currentUser?.profile
                    ? currentUser?.profile
                    : 'よろしくお願いします'
                }
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                sx={{ marginTop: 2, flexGrow: 1, textTransform: 'none' }}
              >
                ユーザー情報を変更
              </Button>
            </CardContent>
          </Card>
        </form>
      </Grid>
    </>
  );
};

export default UserEdit;
