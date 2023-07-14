import { useQuery } from 'react-query';
import { getSearches, getHashTags } from 'api/search';
import { type ApiResponse, type Post, type User } from 'interfaces';

export const useSearches = (
  query: string
): {
  searches: Post[] | User[] | undefined;
  isLoading: boolean;
  error: Error | null;
} => {
  const { data, isLoading, error } = useQuery<
    ApiResponse<Post[] | User[]>,
    Error
  >({
    queryKey: ['searches', query],
    queryFn: () => {
      if (query.startsWith('#')) {
        return getHashTags(query);
      } else {
        return getSearches('query');
      }
    },
  });
  const searches = data?.data;
  return { searches, isLoading, error };
};
