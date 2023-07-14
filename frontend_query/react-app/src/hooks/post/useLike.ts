import { useMutation, useQueryClient } from 'react-query';
import { createLike, deleteLike } from '../../api/like';

export const useCreateLike = (publicId: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => createLike(publicId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', publicId]);
    },
    onError: (error) => {
      console.log(error);
    }
  });
}

export const useDeleteLike = (publicId: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteLike(publicId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', publicId]);
    },
    onError: (error) => {
      console.log(error);
    }
  });
}