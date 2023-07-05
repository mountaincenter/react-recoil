import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useFollowing } from '../../../hooks/follow/useFollowing';
import { useFollowers } from '../../../hooks/follow/useFollowers';

import FollowUserList from './FollowUserList';
import { List } from '@mui/material';

import { type User } from 'interfaces';

import { useCurrentUser } from '../../../hooks/currentUser/useCurrentUser';
import { useUser } from '../../../hooks/user/useUser';

import TabBar from './TabBar';
import { UserBox } from '../../common/UserBox';

const Following = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useUser(username ? username : ' ');
  const { currentUser } = useCurrentUser();

  const { following, isLoading, error } = useFollowing(
    username ? username : ''
  );
  const { followers } = useFollowers(username ? username : '');

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  let hasFollowersYourFollow = false;
  if (!isLoading) {
    hasFollowersYourFollow = Boolean(
      followers?.some((follower) => follower.followed)
    );
  }

  console.log(following);

  return (
    <>
      {user && <UserBox user={user} />}
      <TabBar
        pathname={pathname}
        navigate={navigate}
        username={username ? username : ''}
        currentUser={currentUser as User}
        hasFollowersYourFollow={hasFollowersYourFollow}
      />
      {following?.map((follow: User, index: number) => (
        <List key={index}>
          <FollowUserList follow={follow} />
        </List>
      ))}
    </>
  );
};

export default Following;
