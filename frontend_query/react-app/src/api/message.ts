import { client } from "./client";
import { auth } from "./auth";

export const getAllMessages = async(): Promise<any> => {
  return await client.get("/messages", auth);
}

export const getMessages = async(publicId: string):Promise<any> => {
  return await client.get(`/messages/${publicId}/conversations`, auth);
}

export const createMessage = async(publicId: string, body: string): Promise<any> => {
  return await client.post(`/messages`, {public_id:publicId, body}, auth);
}