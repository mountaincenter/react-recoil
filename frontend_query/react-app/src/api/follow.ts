import { type AxiosResponse } from "axios";
import { client } from "./client";
import { auth } from "./auth"


export const getFollowers = async (username: string): Promise<AxiosResponse> => {
  return client.get(`/users/${username}/followers`, auth)
}

export const getFollowing = async(username: string): Promise<AxiosResponse> => {
  return client.get(`users/${username}/following`, auth)
}


export const followUser = async(id: number): Promise<AxiosResponse> => {
  return client.post(`users/${id}/follows`, {}, auth)
}

export const unfollowUser = async(id: number): Promise<AxiosResponse> => {
  return client.delete(`/users/${id}/follows`, auth)
}