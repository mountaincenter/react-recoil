import { useMutation, useQueryClient } from 'react-query'
import { createBookmark, deleteBookmark } from 'api/bookmark'
import { useNavigate } from 'react-router-dom';

export const useBookmark = (id: number, publicId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createBookmarkMutation = useMutation(() => createBookmark(id),{
    onMutate: async() => {
      await queryClient.cancelQueries(['post', publicId])
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post', publicId])
      navigate('/bookmarks')
    },
    onError:(error) => {
      console.log('Error creating bookmark', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['post', publicId])
    },
  });

  const deleteBookmarkMutation = useMutation(() => deleteBookmark(id), {
    onMutate: async() => {
      await queryClient.cancelQueries(['post', publicId])
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post', publicId])
      navigate('/')
    },
    onError:(error) => {
      console.log('Error deleting bookmark', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['post', publicId])
    }
  })

  return {
    createBookmarkMutation,
    deleteBookmarkMutation,
  }
}