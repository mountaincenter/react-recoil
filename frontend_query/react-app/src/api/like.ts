import { type AxiosResponse } from "axios";
import { client } from "./client";
import { auth } from "./auth";

export const createLike = async(pubicId: string): Promise<AxiosResponse> => {
  return await client.post(`/posts/${pubicId}/likes`, {}, auth);
}

export const deleteLike = async(publicId: string): Promise<AxiosResponse> => {
  return await client.delete(`/posts/${publicId}/likes`, auth);
}