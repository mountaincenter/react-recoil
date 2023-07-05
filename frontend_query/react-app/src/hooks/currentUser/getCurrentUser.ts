import { client } from "../../api/client";
import Cookies from "js-cookie";

export const getCurrentUser = async () => {
  const response = await client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
  return response.data;
};