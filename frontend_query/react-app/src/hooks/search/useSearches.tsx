import { useQuery } from 'react-query';
import { getSearches, getHashTags } from 'api/search';
import { type ApiResponse, type Post, type User } from 'interfaces';

export const useSearches = (
  query: string
): {
  users: User[] | undefined;
  posts: Post[] | undefined;
  isLoading: boolean;
  error: Error | null;
} => {
  console.log('useSearches has been called with', query);
  const { data, isLoading, error } = useQuery<
    ApiResponse<{ users: User[]; posts: Post[] }>,
    Error
  >(
    ['searches', query],
    () => {
      if (query.startsWith('#')) {
        return getHashTags(query.slice(1));
      } else {
        return getSearches(query);
      }
    },
    { enabled: !!query, keepPreviousData: false } // queryが空文字列のときにはuseQueryを実行しない
  );
  // console.log(data?.data);

  let users: User[] | undefined;
  let posts: Post[] | undefined;

  if (query.startsWith('#')) {
    users = [];
    posts = data?.data as Post[] | undefined;
  } else {
    users = data?.data.users as User[] | undefined;
    posts = data?.data.posts as Post[] | undefined;
  }
  // console.log(posts);
  return { users, posts, isLoading, error };
};
