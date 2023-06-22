import React, { useState } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Typography,
  Box,
  Avatar,
} from '@mui/material';

import { type User } from 'interfaces';
import { currentUserState } from 'components/recoil/States/AuthState';
import { useRecoilValue } from 'recoil';

import FollowButton from './FollowButton';

type FollowUserListProps = {
  user: User;
  onFollow: () => void;
  onUnFollow: () => void;
};

const FollowUserList: React.FC<FollowUserListProps> = ({
  user,
  onFollow,
  onUnFollow,
}) => {
  const currentUser = useRecoilValue(currentUserState);
  const [isHover, setIsHover] = useState(false);

  return (
    <ListItem>
      <ListItemAvatar>
        {user.avatar?.url ? (
          <Avatar alt={user.name} src={user.avatar.url} />
        ) : (
          <Avatar>{user.name[0]}</Avatar>
        )}
      </ListItemAvatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>
          {user.name}
          {''}
          {user.id}
        </Typography>
        <Typography variant="subtitle2">
          {user.profile ? user.profile : 'よろしくお願いします'}
        </Typography>
      </Box>
      {currentUser?.id !== user.id && (
        <FollowButton
          isHover={isHover}
          onFollow={onFollow}
          onUnFollow={onUnFollow}
          handleMouseEnter={() => setIsHover(true)}
          handleMouseLeave={() => setIsHover(false)}
          isFollowing={user.following || false}
        />
      )}
    </ListItem>
  );
};

export default FollowUserList;
