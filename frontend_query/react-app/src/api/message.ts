import { type AxiosResponse } from "axios";
import { client } from "./client";
import { getAuth } from "./auth";

export const getAllMessages = async(): Promise<AxiosResponse> => {
  return await client.get("/messages", getAuth());
}

export const getMessages = async(publicId: string):Promise<AxiosResponse> => {
  return await client.get(`/messages/${publicId}/conversations`, getAuth());
}

export const createMessage = async(publicId: string, body: string): Promise<AxiosResponse> => {
  return await client.post(`/messages`, {public_id:publicId, body}, getAuth());
}