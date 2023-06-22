import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { currentUserState,  isSignedInState } from "components/recoil/States/AuthState";
import { useGetCurrentUser } from "lib/api/auth";


export const useFetchCurrentUser = () => {
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  return useQuery("currentUser", useGetCurrentUser, {
    onSuccess: (data) => {
      setIsSignedIn(true);
      setCurrentUser(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};