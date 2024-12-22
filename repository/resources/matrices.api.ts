import { BASE_URL } from "@/config/constant";
import {
  RentalApiResponse,
  SalesApiResponse,
} from "@/types/apiResponses/matrices";
import axios from "axios";

export const fetchSalesMatrix = async (params?: {
  [key: string]: string | number;
}): Promise<SalesApiResponse | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/transaction/trends`, {
      params: params,
    });
    const result = {
      data: response.data.data.data,
    };
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchRentalMatrix = async (params?: {
  [key: string]: string | number;
}): Promise<RentalApiResponse | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/rental/average`, {
      params: params,
    });

    const result = {
      data: response.data.data.data,
    };

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
