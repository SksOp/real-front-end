"use server";

import { LocationSalesTransaction, TransactionAverageValues} from "@/transcation/types";

// import { LocationSales } from "@/charts/location-sales";
import axios from "axios";

export const fetchAverageValues = 
   async (): Promise< TransactionAverageValues | null> => {
     const URL = process.env.AVERAGE_SALES_TRANSACTION_URL!;   
     try {
       const res = await axios.get(URL);
       return res.data;
     } catch (error) {
       console.error(error);
       return null;
     }
   }

export const fetchLocationSales = 
  async (): Promise<LocationSalesTransaction | null> => {
    const URL = process.env.LOCATION_SALES_TRANSACTION_URL!;
    try {
      const res = await axios.get(URL);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }