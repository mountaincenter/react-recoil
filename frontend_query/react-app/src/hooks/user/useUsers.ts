import { useQuery } from 'react-query';
import { getUsers } from '../../api/user';
import { type ApiResponse, type User } from 'interfaces';

export const useUsers = (): { users: User[] | undefined, isLoading: boolean, error: Error | null } => {
  const { data, isLoading, error} = useQuery<ApiResponse<User[]>, Error>(
    'users',
    getUsers
  )

  const users = data?.data;

  return { users, isLoading, error};
}
