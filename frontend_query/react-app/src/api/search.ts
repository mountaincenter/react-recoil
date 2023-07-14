import { type AxiosResponse } from "axios";
import { client } from "./client"

export const getSearches = async(query: string): Promise<AxiosResponse> => {
  return await client.get(`/searches?q=${query}`);
}

export const getHashTags = async(query: string): Promise<AxiosResponse> => {
  return await client.get(`/hashtags/${query}/posts`)
}