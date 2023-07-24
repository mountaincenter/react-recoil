import { type AxiosResponse } from "axios";
import { client } from "./client";
import { getAuth } from "./auth";

export const createLike = async(pubicId: string): Promise<AxiosResponse> => {
  return await client.post(`/posts/${pubicId}/likes`, {}, getAuth());
}

export const deleteLike = async(publicId: string): Promise<AxiosResponse> => {
  return await client.delete(`/posts/${publicId}/likes`, getAuth());
}