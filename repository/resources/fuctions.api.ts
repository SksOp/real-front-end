import {
  TransactionAverageValues,
  TransactionMonthlyAverage,
} from "@/transcation/types";
import axios from "axios";
import {
  AVERAGE_SALES_TRANSACTION_URL,
  SALES_URL,
  TRANSACTION_AVERAGE_URL,
} from "@/repository/common";

export const fetchAverageTransactions =
  async (): Promise<TransactionMonthlyAverage | null> => {
    try {
      const res = await axios.get(TRANSACTION_AVERAGE_URL!);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchAverageValues =
  async (): Promise<TransactionAverageValues | null> => {
    try {
      const res = await axios.get(AVERAGE_SALES_TRANSACTION_URL!);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export type SalesReqBody = {
  bed_rooms?: string;
  location?: string | null;
  developer?: string | null;
  area?: string;
  property_type?: string | null;
  usage?: string | null;
};

export const fetchSales = async (
  body: SalesReqBody
): Promise<TransactionMonthlyAverage | null> => {
  try {
    const res = await axios.post(SALES_URL!, {
      body: body,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
