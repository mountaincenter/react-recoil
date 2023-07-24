import { type AxiosResponse } from "axios";
import { client} from "./client";
import { getAuth } from "./auth";

export const getPosts = async(): Promise<AxiosResponse> => {
  return await client.get("/posts", getAuth());
}

export const getPost = async(publicId: string): Promise<AxiosResponse> => {
  return await client.get(`/posts/${publicId}`, getAuth());
}

export const createPost = async(data: FormData): Promise<AxiosResponse> => {
  return await client.post("/posts", data, getAuth());
}

export const deletePost = async(publicId: string): Promise<void> => {
  return await client.delete(`/posts/${publicId}`, getAuth());
}
