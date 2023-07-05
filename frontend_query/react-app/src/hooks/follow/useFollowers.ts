import { useQuery } from 'react-query';
import { getFollowers, getFollowing } from '../../api/follow';
import { type User, type ApiResponse } from 'interfaces';

export const useFollowers = ( username: string): { followers : User[] | undefined, isLoading: boolean, error: Error | null} => {
  const { data, isLoading, error} = useQuery<ApiResponse<User[]>, Error>({
    queryKey: ['followers', username],
    queryFn: () => getFollowers(username)
});
  const followers = data?.data

  return { followers, isLoading, error}
}

export const useFollowing = ( username: string): { following : User[] | undefined, isLoading: boolean, error: Error | null} => {
  const { data, isLoading, error} = useQuery<ApiResponse<User[]>, Error>({
    queryKey: ['user', 'following', username],
    queryFn: () => getFollowing(username)
});
  const following = data?.data
  return { following, isLoading, error}
}