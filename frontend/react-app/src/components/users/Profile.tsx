import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import { type Todo } from 'interfaces';
import { currentUserState } from 'components/recoil/States/AuthState';
import {
  userStateFamily,
  followersStateFamily,
  followingStateFamily,
  followersCountStateFamily,
  followingCountState,
} from 'components/recoil/States/userState';
import TodoListByDate from 'components/todos/ListItem';
import FollowButton from './FollowButton';
import { useFollowActions } from 'hooks/useFollowActions';

const Profile = () => {
  const { username } = useParams<Record<string, string>>();
  const usernameAsString = username ? username : '';

  const [user, setUser] = useRecoilState(userStateFamily(usernameAsString));
  const [followers, setFollowers] = useRecoilState(
    followersStateFamily(usernameAsString)
  );
  const following = useRecoilValue(followingStateFamily(usernameAsString));

  const currentUser = useRecoilValue(currentUserState);
  const followersCount = useRecoilValue(
    followersCountStateFamily(usernameAsString)
  );
  const followingCount = useRecoilValue(followingCountState(usernameAsString));

  const { followUser, unFollowUser } = useFollowActions(setFollowers, setUser);

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  console.log(followers);
  console.log(following);
  console.log(user);

  return (
    <>
      <Container maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ m: 3 }}>
              <Box sx={{ m: 3 }}>
                {user?.avatar?.url ? (
                  <Avatar alt={user.name} src={user.avatar.url} />
                ) : (
                  <Avatar>{user?.name[0]}</Avatar>
                )}
                <Box flexGrow={1} sx={{ m: 0 }}>
                  <CardHeader
                    sx={{ flexGrow: 1 }}
                    title={
                      <Box justifyContent="center">
                        <Typography variant="h6">{user?.username}</Typography>
                      </Box>
                    }
                    subheader={
                      <>
                        <Link to={`/${user?.username}/followers`}>
                          {followersCount} フォロワー{''}
                        </Link>
                        {''}
                        <Link to={`/${user?.username}/following`}>
                          {followingCount} フォロー中
                        </Link>
                      </>
                    }
                  />
                </Box>
                {currentUser?.id !== user?.id ? (
                  <FollowButton
                    isHover={isHover}
                    onFollow={() => user && followUser(user)}
                    onUnFollow={() => user && unFollowUser(user)}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    isFollowing={user?.followed ?? false}
                  />
                ) : (
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    プロフィール編集
                  </Button>
                )}
                <CardContent>
                  <TodoListByDate
                    todos={user?.todos}
                    isProfile={true}
                    makeTodoLink={(todo: Todo) =>
                      `/${user?.username}/status/${todo.id}`
                    }
                    userName={user?.name}
                    makeIsCurrentUser={() => user?.id === currentUser?.id}
                  />
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
