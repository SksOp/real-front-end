import {
  BedroomType,
  FreeholdVsLeaseType,
  IQRType,
  LocationSalesTransaction,
  OffplanvsReadyType,
  RecieveDataType,
  ResidentialVsCommercialType,
  TransactionAverageValues,
  TransactionMonthlyAverage,
} from "@/transcation/types";
import { ListingDataType } from "@/types/listing";
import { LastFiveTransactionprops } from "@/types/transactionCard";
import axios from "axios";

export const fetchAverageTransactions =
  async (): Promise<TransactionMonthlyAverage | null> => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_TRANSACTION_AVERAGE_URL!
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchAverageValues =
  async (): Promise<TransactionAverageValues | null> => {
    try {
      const URL = process.env.NEXT_PUBLIC_AVERAGE_SALES_TRANSACTION_URL!;
      const res = await axios.get(URL);
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
    const res = await axios.post(process.env.NEXT_PUBLIC_SALES_URL!, {
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
      const res = await axios.get(
        process.env.NEXT_PUBLIC_LOCATION_SALES_TRANSACTION_URL!
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchBedrooms = async (): Promise<BedroomType | null> => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_DISTINCT_BEDROOM_URL!);
    const data: {
      year: number;
      month: string;
      bedrooms: string;
      property_count: number;
    }[] = res.data;

    // Transforming data
    const transformedData: BedroomType = {};

    data.forEach((item) => {
      const { year, month, bedrooms, property_count } = item;
      if (!transformedData[year]) {
        transformedData[year] = {};
      }
      if (!transformedData[year][month]) {
        transformedData[year][month] = {};
      }
      if (!transformedData[year][month][bedrooms]) {
        transformedData[year][month][bedrooms] = {
          property_count: 0,
        };
      }
      transformedData[year][month][bedrooms].property_count += property_count;
    });

    return transformedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchResidentialVsCommercialType =
  async (): Promise<ResidentialVsCommercialType | null> => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_RESIDENTIAL_COMMERCIAL_URL!
      );
      const data: {
        year: number;
        month: string;
        usage: string;
        property_count: number;
      }[] = res.data;

      // Transforming data
      const transformedData: ResidentialVsCommercialType = {};

      data.forEach((item) => {
        const { year, month, usage, property_count } = item;
        if (!transformedData[year]) {
          transformedData[year] = {};
        }
        if (!transformedData[year][month]) {
          transformedData[year][month] = {};
        }
        if (!transformedData[year][month][usage]) {
          transformedData[year][month][usage] = {
            property_count: 0,
          };
        }
        transformedData[year][month][usage].property_count += property_count;
      });

      return transformedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchOffplanVsReady =
  async (): Promise<OffplanvsReadyType | null> => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_OFFPLAN_READY_URL!);
      const data: {
        year: string;
        month: string;
        status: number;
        property_count: number;
      }[] = res.data;

      // Transforming data
      const transformedData: OffplanvsReadyType = {};

      data.forEach((item) => {
        const { year, month, status, property_count } = item;
        if (!transformedData[year]) {
          transformedData[year] = {};
        }
        if (!transformedData[year][month]) {
          transformedData[year][month] = {};
        }
        if (!transformedData[year][month][status]) {
          transformedData[year][month][status] = 0;
        }
        transformedData[year][month][status] += property_count;
      });

      return transformedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchFreeholdVsLease =
  async (): Promise<FreeholdVsLeaseType | null> => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_FREEHOLD_LEASE_URL!);
      const data: {
        year: string;
        month: string;
        tenure: number;
        property_count: number;
      }[] = res.data;

      console.log("data: ", data);

      // Transforming data
      const transformedData: FreeholdVsLeaseType = {};

      data.forEach((item) => {
        const { year, month, tenure, property_count } = item;
        if (!transformedData[year]) {
          transformedData[year] = {};
        }
        if (!transformedData[year][month]) {
          transformedData[year][month] = {};
        }
        if (!transformedData[year][month][tenure]) {
          transformedData[year][month][tenure] = 0;
        }
        transformedData[year][month][tenure] += property_count;
      });

      console.log("transformedData: ", transformedData);

      return transformedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchIQR = async (): Promise<IQRType[] | null> => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_IQR_URL!);
    const data: { Percentile_25: number; Percentile_75: number }[] = res.data;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchFlatVillaLand = async (): Promise<{
  rowsFlat: RecieveDataType[];
  rowsVilla: RecieveDataType[];
  rowsLand: RecieveDataType[];
} | null> => {
  const URL = process.env.NEXT_PUBLIC_FVL_URL!;
  try {
    const res = await axios.get(URL);
    const data: {
      rowsFlat: RecieveDataType[];
      rowsVilla: RecieveDataType[];
      rowsLand: RecieveDataType[];
    } = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchLastTransactions = async (): Promise<
  LastFiveTransactionprops[] | null
> => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_LASTFIVETRANSACTION_URL!
    );
    const data: LastFiveTransactionprops[] = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchListings = async (): Promise<ListingDataType[] | null> => {
  try {
    const res = await axios.post("http://localhost:5050/api", {
      propertyfinderURL:
        "https://www.propertyfinder.ae/en/agent/charlie-simmonds-236369",
      bayutURL: "https://www.bayut.com/brokers/charlie-simmonds-2089799.html",
    });
    const data: ListingDataType[] = res.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
