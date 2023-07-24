import { type AxiosResponse } from "axios"
import { client } from "./client"
import { getAuth} from "./auth"

export const getBookmarks = async(): Promise<AxiosResponse> =>{
  return await client.get("/users/bookmarking", getAuth())
}

export const createBookmark = async(id: number): Promise<AxiosResponse> => {
  return client.post(`posts/${id}/bookmarks`, {}, getAuth())
}

export const deleteBookmark = async(id: number): Promise<AxiosResponse> => {
  return client.delete(`posts/${id}/bookmarks`, getAuth())
}