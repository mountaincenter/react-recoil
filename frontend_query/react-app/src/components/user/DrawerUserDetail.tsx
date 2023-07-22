import { Box, Typography, Avatar, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';
import { useFollowersCount } from 'hooks/follow/useFollowersCount';
import { useFollowingCount } from 'hooks/follow/useFollowingCount';

import Sidebar from 'layout/Sidebar';

import { type User } from 'interfaces';

interface DrawerUserDetailProps {
  currentUser: User;
  handleDrawerClose: () => void;
}

const DrawerUserDetail = ({
  currentUser,
  handleDrawerClose,
}: DrawerUserDetailProps) => {
  const followersCount = useFollowersCount(currentUser.username);
  const followingCount = useFollowingCount(
    currentUser?.username ? currentUser.username : ''
  );

  return (
    <Box style={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">アカウント情報</Typography>
        <IconButton onClick={handleDrawerClose}>
          <CancelIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        {currentUser?.avatar.url ? (
          <Avatar src={currentUser.avatar.url} sx={{ width: 60, height: 60 }} />
        ) : (
          <Avatar sx={{ width: 60, height: 60 }}>{currentUser?.name[0]}</Avatar>
        )}
        <Typography variant="h5" mt={1}>
          {currentUser?.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          @{currentUser?.username}
        </Typography>
        <Box display="flex" justifyContent="center" mt={1}>
          <Typography variant="body2" mr={1}>
            {followersCount} フォロワー
          </Typography>
          <Typography variant="body2">{followingCount} フォロー中</Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <Link to="/logout">
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Link>
      </Box>
      <Sidebar />
    </Box>
  );
};

export default DrawerUserDetail;
