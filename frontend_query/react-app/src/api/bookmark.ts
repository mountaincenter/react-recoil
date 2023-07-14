import { type AxiosResponse } from "axios"
import { client } from "./client"
import { auth } from "./auth"

export const getBookmarks = async(): Promise<AxiosResponse> =>{
  return await client.get("/users/bookmarking", auth)
}

export const createBookmark = async(id: number): Promise<AxiosResponse> => {
  return client.post(`posts/${id}/bookmarks`, {}, auth)
}

export const deleteBookmark = async(id: number): Promise<AxiosResponse> => {
  return client.delete(`posts/${id}/bookmarks`, auth)
}