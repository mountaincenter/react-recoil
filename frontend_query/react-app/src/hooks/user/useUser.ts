import { useQuery } from "react-query";
import { getUser } from "../../api/user";
import { type ApiResponse, type User } from "interfaces"

export const useUser = (username: string):  { user: User | undefined, isLoading: boolean, error: Error | null }  => {
  const { data, isLoading, error } = useQuery<ApiResponse<User>, Error>({
    queryKey: ['user', username],
    queryFn: () => getUser(username)
  });

  const user = data?.data;

  return { user, isLoading, error };
};
