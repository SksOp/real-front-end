"use server";

import {
  TransactionAverageValues,
  TransactionMonthlyAverage,
} from "@/transcation/types";

// import { LocationSales } from "@/charts/location-sales";
import axios from "axios";

type body = {
  bed_rooms?: string;
  location?: string | null;
  developer?: string | null;
  area?: string;
  property_type?: string | null;
  usage?: string | null;
};
export const fetchAverageTransactions =
  async (): Promise<TransactionMonthlyAverage | null> => {
    const URL = process.env.TRANSACTION_AVERAGE_URL!;
    try {
      const res = await axios.get(URL);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchAverageValues =
  async (): Promise<TransactionAverageValues | null> => {
    const URL = process.env.AVERAGE_SALES_TRANSACTION_URL!;
    try {
      const res = await axios.get(URL);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchSales = async (
  body: body
): Promise<TransactionMonthlyAverage | null> => {
  const URL = process.env.SALES_URL!;
  try {
    const res = await axios.post(URL, {
      body: body,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export const fetchLocationSales = async (): Promise<LocationSales[] | null> => {
//   const URL = process.env.LOCATION_SALES_URL!;
//   try {
//     const res = await axios.get(URL);
//     return res.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
