import { useFollowers } from "./useFollowers";

export const useFollowersCount = (username: string) => {
  const { followers } = useFollowers(username);

  return followers ? followers.length : 0;
}