import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useFollowers } from '../../../hooks/follow/useFollowers';

import FollowUserList from './FollowUserList';
import { List } from '@mui/material';

import { type User } from 'interfaces';

import { useCurrentUser } from '../../../hooks/currentUser/useCurrentUser';
import { useUser } from '../../../hooks/user/useUser';

import TabBar from './TabBar';
import { UserBox } from '../../common/UserBox';

const FollowersYourFollow = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useUser(username ? username : ' ');
  const { currentUser } = useCurrentUser();

  const { followers, isLoading, error } = useFollowers(
    username ? username : ''
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  console.log(followers);
  console.log(user);

  let hasFollowersYourFollow = false;
  if (!isLoading) {
    hasFollowersYourFollow = Boolean(
      followers?.some((follower) => follower.followed)
    );
  }

  console.log(hasFollowersYourFollow);

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
      {followers?.map((follower: User, index: number) => (
        <List key={index}>
          {follower.followed && <FollowUserList follow={follower} />}
        </List>
      ))}
    </>
  );
};

export default FollowersYourFollow;
