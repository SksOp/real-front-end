import {
  BedroomType,
  LocationSalesTransaction,
  ResidentialVsCommercialType,
  TransactionAverageValues,
  TransactionMonthlyAverage,
} from "@/transcation/types";
import axios from "axios";
import {
  AVERAGE_SALES_TRANSACTION_URL,
  DISTINCT_BEDROOM_URL,
  LOCATION_SALES_TRANSACTION_URL,
  RESIDENTIAL_COMMERCIAL_URL,
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

export const fetchLocationSales =
  async (): Promise<LocationSalesTransaction | null> => {
    try {
      const res = await axios.get(LOCATION_SALES_TRANSACTION_URL!);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchBedrooms = async (): Promise<BedroomType | null> => {
  try {
    const res = await axios.get(DISTINCT_BEDROOM_URL);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchResidentialVsCommercialType =
  async (): Promise<ResidentialVsCommercialType | null> => {
    try {
      const res = await axios.get(RESIDENTIAL_COMMERCIAL_URL);
      const data: { year: number; usage: string; property_count: number }[] =
        res.data;

      // Transforming data
      const transformedData: ResidentialVsCommercialType = {};

      data.forEach((item) => {
        const { year, usage, property_count } = item;
        if (!transformedData[year]) {
          transformedData[year] = {};
        }
        if (!transformedData[year][usage]) {
          transformedData[year][usage] = 0;
        }
        transformedData[year][usage] += property_count;
      });

      return transformedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
