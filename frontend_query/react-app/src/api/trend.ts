import { type AxiosResponse } from "axios";
import { client } from "./client";

export const getTrends = async(): Promise<AxiosResponse> => {
  return await client.get("/trends")
}