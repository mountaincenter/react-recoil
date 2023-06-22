import React from 'react';

import { Box, Typography } from '@mui/material';

import {
  isSignedInState,
  currentUserState,
} from 'components/recoil/States/AuthState';

import { useRecoilValue } from 'recoil';
import { type User } from 'interfaces';

interface Props {
  theme: string;
}

const UserBox = ({ theme }: Props) => {
  const isSignedIn = useRecoilValue(isSignedInState);
  const currentUser = useRecoilValue(currentUserState);
  console.log(isSignedIn);
  console.log(currentUser);
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" align="center">
        {theme}
      </Typography>
      {isSignedIn && (
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ログイン中のユーザー:{currentUser?.name}
        </Typography>
      )}
    </Box>
  );
};

export default UserBox;
