import { useMutation, useQueryClient } from "react-query";
import { followUser, unfollowUser } from "../../api/follow";
import { useCurrentUser } from "../currentUser/useCurrentUser";

export const useFollow = (
  id: number,
  username: string,
  onFollowSuccess: () => void,
  onUnFollowSuccess: () => void
  ) => {
  const queryClient = useQueryClient()
  const { currentUser} = useCurrentUser();

  const followMutation = useMutation(() => followUser(id), {
    onMutate: async () => {
      queryClient.cancelQueries(['following', currentUser?.username])
      queryClient.cancelQueries(['followers', username])
    },
    onSuccess: (data) => {
      console.log('Follow response', data.data)
      onFollowSuccess();
      queryClient.invalidateQueries(['user', 'following', currentUser?.username]);
      queryClient.invalidateQueries(['user', 'followers', username]);
    },
    onError: (error) => {
      console.log(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['following', currentUser?.username])
      queryClient.invalidateQueries(['followers', username])
    }
  });
  const unfollowMutation = useMutation(() => unfollowUser(id), {
    onMutate: async () => {
      queryClient.cancelQueries(['following', currentUser?.username])
      queryClient.cancelQueries(['followers', username])
    },
    onSuccess: () => {
      onUnFollowSuccess();
      queryClient.invalidateQueries(['user', 'following', currentUser?.username]);
      queryClient.invalidateQueries(['user', 'followers', username]);
    },
    onError: (error) => {
      console.log(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['following', currentUser?.username])
      queryClient.invalidateQueries(['followers', username])
    }
  })

  // console.log(following)
  // console.log(followers)
  return {
    followMutation,
    unfollowMutation,
    isFollowLoading: followMutation.isLoading,
    isUnfollowLoading: unfollowMutation.isLoading
  }
}