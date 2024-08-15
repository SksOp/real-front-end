// "use server";

import { fetchSalesIndexBenchmarkType, FreeholdVsLeaseType, OffplanvsReadyType, ResidentialVsCommercialType } from "@/transcation/types";
import axios from "axios";

// import { BedroomType, LocationSalesTransaction, ResidentialVsCommercialType, TransactionAverageValues} from "@/transcation/types";

// // import { LocationSales } from "@/charts/location-sales";
// import axios from "axios";

// export const fetchAverageValues =
//    async (): Promise< TransactionAverageValues | null> => {
//      const URL = process.env.AVERAGE_SALES_TRANSACTION_URL!;
//      try {
//        const res = await axios.get(URL);
//        return res.data;
//      } catch (error) {
//        console.error(error);
//        return null;
//      }
//    }

// export const fetchLocationSales =
//   async (): Promise<LocationSalesTransaction | null> => {
//     const URL = process.env.LOCATION_SALES_TRANSACTION_URL!;
//     try {
//       const res = await axios.get(URL);
//       return res.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   export const fetchBedrooms =
//   async (): Promise<BedroomType | null  > => {
//     const URL = process.env.DISTINCT_BEDROOM_URL!;
//     try {
//       const res = await axios.get(URL);
//       return res.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

  


 // export interface OffplanvsReadyType {
  //   [year: string]: {
  //     [month : string]: { 
  //       [status: number]: number;
  //     }
  //   };
  // }


  export const fetchOffplanVsLease = async (): Promise<OffplanvsReadyType | null> => {
    const URL = process.env.OFFPLAN_READY_URL!;
    try {
      const res = await axios.get(URL);
      const data: { year: string; month: string; status: number; property_count: number }[] = res.data;

      // Transforming data
      const transformedData: OffplanvsReadyType = {};

      data.forEach(item => {
        const { year, month, status, property_count } = item;
        if (!transformedData[year]) {
          transformedData[year] = {};
        }
        if (!transformedData[year][month]) {
          transformedData[year][month] = {};
        }
        if (!transformedData[year][month][status]) {
          transformedData[year][month][status] = 0
        }
        transformedData[year][month][status] += property_count;
      });

      console.log("transformedData: ",transformedData);

      return transformedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  export const fetchSalesIndexBenchmark = async (): Promise<fetchSalesIndexBenchmarkType | null> => {
    const URL = process.env.SALES_INDEX_URL!;
    try {
      const res = await axios.get(URL);
      const data: {years: string;
        quarters : string;
        months :string} = res.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  
