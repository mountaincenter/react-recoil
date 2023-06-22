import { useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie";
import { type SignInData } from "interfaces";
import { signIn } from "lib/api/auth";
import { useSetRecoilState } from "recoil";
import { currentUserState, isSignedInState } from "components/recoil/States/AuthState";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  return useMutation((data: SignInData) => signIn(data), {
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.set("_access_token", data.headers["access-token"] ?? "");
        Cookies.set("_client", data.headers.client ?? "");
        Cookies.set("_uid", data.headers.uid ?? "");
        queryClient.setQueryData("currentUser", data);
        console.log(data.data)
        setIsSignedIn(true);
        setCurrentUser(data.data);
      }
    },
    onError: () => {
      console.log("error");
    },
  });
};