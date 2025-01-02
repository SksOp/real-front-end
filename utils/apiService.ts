import { BASE_URL } from "@/config/constant";
import { ApiResponse } from "@/types/response";
import axios from "axios";

export default async function ApiService(
  route: string,
  subroute: string,
  params: {
    [key: string]: string | number;
  }
): Promise<ApiResponse> {
  const response = await axios.get(`${BASE_URL}/api/${route}/${subroute}`, {
    params,
  });
  return response.data;
}
