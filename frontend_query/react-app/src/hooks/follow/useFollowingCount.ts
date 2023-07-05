import { useFollowing } from './useFollowing';

export const useFollowingCount = (username: string) => {
  const { following } = useFollowing(username);

  return following ? following.length : 0;
}
