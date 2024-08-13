// "use server";

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

//   export const fetchResidentialVsCommercialType = async (): Promise<ResidentialVsCommercialType | null> => {
//     const URL = process.env.RESIDENTIAL_COMMERCIAL_URL!;
//     try {
//       const res = await axios.get(URL);
//       const data: { year: number; usage: string; property_count: number }[] = res.data;

//       // Transforming data
//       const transformedData: ResidentialVsCommercialType = {};

//       data.forEach(item => {
//         const { year, usage, property_count } = item;
//         if (!transformedData[year]) {
//           transformedData[year] = {};
//         }
//         if (!transformedData[year][usage]) {
//           transformedData[year][usage] = 0;
//         }
//         transformedData[year][usage] += property_count;
//       });

//       return transformedData;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };
