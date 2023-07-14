import { useQuery } from 'react-query';
import { getCurrentUser } from './getCurrentUser';
import { type User, type CurrentUserApiResponse } from "interfaces"

export const useCurrentUser = (): { currentUser: User | undefined, isLoading: boolean, error: Error | null} => {
  const { data, isLoading, error} = useQuery<CurrentUserApiResponse, Error>('currentUser', getCurrentUser)

  // console.log(data)
  const currentUser = data?.currentUser
  return { currentUser, isLoading, error};
};
