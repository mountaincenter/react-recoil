import { type AxiosResponse } from "axios";
import { client} from "./client";
import { auth } from "./auth";

export const getPosts = async(): Promise<AxiosResponse> => {
  return await client.get("/posts", auth);
}

export const getPost = async(publicId: string): Promise<AxiosResponse> => {
  return await client.get(`/posts/${publicId}`, auth);
}

export const createPost = async(data: FormData): Promise<AxiosResponse> => {
  return await client.post("/posts", data, auth);
}

export const deletePost = async(publicId: string): Promise<void> => {
  return await client.delete(`/posts/${publicId}`, auth);
}
