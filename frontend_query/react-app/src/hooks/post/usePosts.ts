import { useQuery } from 'react-query';
import { type Post, type ApiResponse } from 'interfaces';
import { getPosts } from '../../api/post';

export const usePosts = ():{ posts: Post[] | undefined, isLoading: boolean, error: Error | null} => {
  const { data, isLoading, error } = useQuery<ApiResponse<Post[]>, Error>({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
  console.log( data)
  const posts = data?.data;
  return { posts, isLoading, error };
}
