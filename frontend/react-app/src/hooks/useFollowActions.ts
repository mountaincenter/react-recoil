import { type User} from "interfaces";
import { SetterOrUpdater } from "recoil";
import { followUserApi, unfollowUserApi } from "lib/api/follow";

export const useFollowActions = (
  setCurrentUserFollowers: SetterOrUpdater<User[] | undefined>,
  setUser: SetterOrUpdater<User | undefined>,
) => {
  const followUser = async(followedUser: User) => {
    try {
      await followUserApi(followedUser);
      setCurrentUserFollowers((prevFollowers: User[] | undefined) => {
        if (!prevFollowers) {
          return [followedUser];
        }
        return [...prevFollowers, followedUser];
      });
      setUser((prevUser: User | undefined) => {
        if(!prevUser) {
          return undefined
        };
        return {...prevUser, followed: true}
      });
    } catch (error) {
      console.log(error);
    }
  }

  const unFollowUser = async(unfollowedUser: User ) => {
    try {
      await unfollowUserApi(unfollowedUser);
      setCurrentUserFollowers((prevFollowers: User[] | undefined) =>
        prevFollowers ? prevFollowers.filter((follower: User) => follower.id !== unfollowedUser.id) : undefined
      );
      setUser((prevUser: User | undefined) => {
        if(!prevUser) {
          return undefined
        };
        return {...prevUser, followed: false}
      });
    } catch(error) {
      console.log(error);
    }
  }

  return { followUser, unFollowUser}
};