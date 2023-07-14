import { useMutation, useQueryClient } from "react-query";
import { createPost } from "api/post";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const postMutation = useMutation((data: FormData) => createPost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
    onError:(error) => {
      console.log(error)
    }
  })

  return{ postMutation}
}