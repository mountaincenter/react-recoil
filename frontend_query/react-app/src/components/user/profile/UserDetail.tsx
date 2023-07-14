import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/user/useUser';
import { useCurrentUser } from '../../../hooks/currentUser/useCurrentUser';
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

import { useFollowersCount } from '../../../hooks/follow/useFollowersCount';
import { useFollowingCount } from '../../../hooks/follow/useFollowingCount';

import FollowButton from '../follow/FollowButton';

import { UserAvatar } from '../../common/UserAvatar';

const UserDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, isLoading, error } = useUser(username ? username : '');
  const { currentUser } = useCurrentUser();
  const followersCount = useFollowersCount(username ? username : '');
  const followingCount = useFollowingCount(username ? username : '');

  console.log(user);
  // console.log(currentUser);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  const goEdit = () => {
    navigate(`/${user?.username}/edit`);
  };

  const goMessages = () => {
    navigate(`/${user?.username}/messages`);
  };

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ m: 3, width: '400px' }}>
          <Box sx={{ m: 3 }}>
            <Box
              justifyContent="space-between"
              alignItems="flex-end"
              display="flex"
            >
              <UserAvatar
                pathname={user?.username ? user?.username : ''}
                name={user?.name ? user?.name : ''}
                avatar={user?.avatar ? user?.avatar : { url: '' }}
                sx={{ width: 150, height: 150, fontSize: '4rem' }}
              />
              {currentUser?.id !== user?.id ? (
                <Box>
                  <Tooltip title="メッセージ">
                    <IconButton onClick={goMessages}>
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                  <FollowButton
                    initialIsFollowing={user?.followed ? user?.followed : false}
                    username={user?.username ? user?.username : ''}
                    id={user?.id ? user?.id : 0}
                  />
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={goEdit}
                >
                  プロフィール編集
                </Button>
              )}
            </Box>
            <Box flexGrow={1} sx={{ m: 0 }}>
              <CardHeader
                sx={{ flexGrow: 1 }}
                title={
                  <Box justifyContent="center">
                    <Typography variant="h5">{user?.name}</Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      sx={{ mb: '4px' }}
                    >
                      @{user?.username}
                    </Typography>
                  </Box>
                }
                subheader={
                  <>
                    <Link
                      to={`/${user?.username}/followers/`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        marginRight: '10px',
                      }}
                    >
                      {followersCount} フォロワー{''}
                    </Link>
                    {''}
                    <Link
                      to={`/${user?.username}/following/`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      {followingCount} フォロー中
                    </Link>
                  </>
                }
              />
              <CardContent>
                <Typography variant="body1" sx={{ m: 0 }}>
                  {user?.profile ? user?.profile : 'よろしくお願いします'}
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default UserDetail;
