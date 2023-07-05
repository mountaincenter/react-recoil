import { useMutation, useQueryClient } from "react-query";
import { createMessage } from "../../api/message";

export const useMessage = (publicId: string) => {
  const queryClient = useQueryClient()

  const messageMutation = useMutation((body: string) => createMessage(publicId, body), {
    onMutate: async () => {
      queryClient.cancelQueries(['messages', publicId])
    },
    onSuccess: (data) => {
      console.log('Message response', data.data)
      queryClient.invalidateQueries(['messages', publicId]);
    },
    onError: (error) => {
      console.log(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['messages', publicId])
    }
  });

  return{ messageMutation }
}