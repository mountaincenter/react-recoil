import { useQuery } from "react-query";
import { getAllMessages } from "api/message";
import { type User, type ApiResponse } from "interfaces";

export const useAllMessages = () : { messages: User[] | undefined, isLoading: boolean, error: Error | null} => {
  const { data, isLoading, error} = useQuery<ApiResponse<User[]>, Error>({
    queryKey: ['messages'],
    queryFn: () => getAllMessages()
});
  const messages = data?.data
  return { messages, isLoading, error}
}
