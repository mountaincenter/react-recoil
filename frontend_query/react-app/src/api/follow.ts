import { type AxiosResponse } from "axios";
import { client } from "./client";
import { getAuth } from "./auth"


export const getFollowers = async (username: string): Promise<AxiosResponse> => {
  return client.get(`/users/${username}/followers`, getAuth())
}

export const getFollowing = async(username: string): Promise<AxiosResponse> => {
  return client.get(`users/${username}/following`, getAuth())
}


export const followUser = async(id: number): Promise<AxiosResponse> => {
  return client.post(`users/${id}/follows`, {}, getAuth())
}

export const unfollowUser = async(id: number): Promise<AxiosResponse> => {
  return client.delete(`/users/${id}/follows`, getAuth())
}