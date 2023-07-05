import { useQuery } from 'react-query';
import { getCurrentUser } from './getCurrentUser';

export const useCurrentUser = () => {
  const { data, isLoading, error} = useQuery('currentUser', getCurrentUser)

  const currentUser = data?.currentUser
  return { currentUser, isLoading, error};
};
