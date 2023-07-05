import { useQuery } from "react-query";
import{ getMessages } from "../../api/message";
import { type Message, type ApiResponse } from "interfaces";

export const useMessages = (publicId: string): { messages: Message[] | undefined, isLoading: boolean, error: Error | null} => {
  const { data, isLoading, error} = useQuery<ApiResponse<Message[]>, Error>({
    queryKey: ['messages', publicId],
    queryFn: () => getMessages(publicId)
});
  const messages = data?.data
  return { messages, isLoading, error}
}