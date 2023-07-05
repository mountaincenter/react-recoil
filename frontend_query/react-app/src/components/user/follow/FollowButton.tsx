import { useState } from 'react';
import Button from '@mui/material/Button';

import { useFollow } from '../../../hooks/follow/useFollow';

interface FollowButtonProps {
  initialIsFollowing: boolean;
  username: string;
  id: number;
}

const FollowButton = ({
  initialIsFollowing,
  username,
  id,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isHover, setIsHover] = useState(false);
  const {
    followMutation,
    unfollowMutation,
    isFollowLoading,
    isUnfollowLoading,
  } = useFollow(
    id,
    username,
    () => setIsFollowing(true),
    () => setIsFollowing(false)
  );

  if (isFollowLoading || isUnfollowLoading) {
    return <>Loading...</>;
  }

  return isFollowing ? (
    <Button
      variant="outlined"
      color={isHover ? 'error' : 'primary'}
      sx={{
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => unfollowMutation.mutate()}
      disabled={isUnfollowLoading}
    >
      {isUnfollowLoading
        ? 'Loading...'
        : isHover
        ? 'フォロー解除'
        : 'フォロー中'}
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: '9999px',
        whiteSpace: 'nowarp',
      }}
      onClick={() => followMutation.mutate()}
      disabled={isFollowLoading}
    >
      {isFollowLoading ? 'Loading...' : 'フォロー'}
    </Button>
  );
};

export default FollowButton;
