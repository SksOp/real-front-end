import { BASE_URL } from "@/config/constant";
import { useAuth } from "@/lib/auth";
import { ApiResponse } from "@/types/response";
import axios from "axios";

export default async function ApiService(
  route: string,
  subroute: string,
  params?: { [key: string]: string | number },
  token?: string | null
): Promise<ApiResponse> {
  try {
    if (!token) {
      return {
        timestamp: new Date(),
        status: "error",
        message: "Authentication error. Please log in.",
        responseStatus: 401,
        result: null,
      };
    }

    const response = await axios.get(`${BASE_URL}/api/${route}/${subroute}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in ApiService:", error);
    return {
      timestamp: new Date(),
      status: "error",
      message: "An error occurred. Please try again later.",
      responseStatus: 500,
      result: null,
    };
  }
}
