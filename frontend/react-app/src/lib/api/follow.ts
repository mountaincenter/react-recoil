import client, { auth } from 'lib/api/client'
import { type User } from 'interfaces'

export const followUserApi = async(followedUser: User) => {
  try {
    const response = await client.post(`/users/${followedUser.id}/follows`, {}, auth)
    return response.data as User;
  } catch (error) {
    throw error;
  }
}

export const unfollowUserApi = async(followedUser: User) => {
  try {
    const response = await client.delete(`/users/${followedUser.id}/follows`, auth)
    return response.data as User;
  } catch (error) {
    throw error;
  }
}