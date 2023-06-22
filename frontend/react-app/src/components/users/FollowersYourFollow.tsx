import { Container, Grid, List, Divider } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from 'components/recoil/States/AuthState';
import {
  followersStateFamily,
  followingStateFamily,
} from 'components/recoil/States/userState';
import { type User } from 'interfaces';

import FollowUserList from 'components/users/FollowUserList';

import { useFollowActions } from 'hooks/useFollowActions';
import TabBar from './TabBar';

const FollowersYourFollow = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { username } = useParams<Record<string, string>>();
  const usernameAsString = username ? username : '';
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const currentUserFollowers = useRecoilValue(
    followersStateFamily(currentUser?.username ?? '')
  );
  const followers = useRecoilValue(followersStateFamily(usernameAsString));
  const setFollowing = useSetRecoilState(
    followingStateFamily(usernameAsString)
  );

  const { followUser, unFollowUser } = useFollowActions(
    setFollowing,
    setCurrentUser
  );

  console.log(currentUserFollowers);
  return (
    <>
      <Container maxWidth="md">
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ mt: 10 }}>
            <TabBar
              pathname={pathname}
              navigate={navigate}
              username={usernameAsString}
              currentUser={currentUser as User}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            {followers &&
              followers.flat().map(
                (follow: User, index: number) =>
                  follow.following && (
                    <List key={index}>
                      <FollowUserList
                        user={follow}
                        onFollow={() => followUser(follow)}
                        onUnFollow={() => unFollowUser(follow)}
                      />
                      <Divider variant="inset" component="li" />
                    </List>
                  )
              )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FollowersYourFollow;
