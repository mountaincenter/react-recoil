import { useQuery } from "react-query";
import { getPost } from "../../api/post";
import { type ApiResponse, type Post } from "interfaces"

export const usePost = (publicId: string):  { post: Post | undefined, isLoading: boolean, error: Error | null }  => {
  const { data, isLoading, error } = useQuery<ApiResponse<Post>, Error>({
    queryKey: ['post', publicId],
    queryFn: () => getPost(publicId)
  });

  const post = data?.data;
  return { post, isLoading, error };
};