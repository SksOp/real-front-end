export interface SalesMonthData {
  Month: number;
  number_of_Row_Used: number;
  Total_Value_of_Transaction: number;
  Total_price_per_sqft: number;
  average_value_of_transactions: number;
  average_Price_per_sqft: number;
}

export interface SalesYearData {
  Year: number;
  number_of_Row_Used: number;
  Total_Value_of_Transaction: number;
  Total_area_in_meter: number;
  Total_price_per_sqft: number;
  average_value_of_transactions: number;
  average_Price_per_sqft: number;
  month_data: SalesMonthData[];
}

export interface SalesApiResponse {
  data: SalesYearData[];
}

export interface RentalMonthData {
  Month: number;
  Total_Transactions: number;
  Total_Monthly_Rent: number;
  Avg_Monthly_Rent: number;
  Total_Monthly_Rent_New: number;
  Avg_Monthly_Rent_New: number;
  Total_Monthly_Rent_Renewal: number;
  Avg_Monthly_Rent_Renewal: number;
  Total_Transactions_New: number;
  Total_Transactions_Renewal: number;
  Renewal_Ratio: number;
}

export interface RentalYearData {
  Year: number;
  total_transaction_yearly: number;
  total_transaction_new_yearly: number;
  total_transaction_renewal_yearly: number;
  renewal_ratio_yearly: number;
  avg_rent_yearly: number;
  avg_rent_new_yearly: number;
  avg_rent_renewal_yearly: number;
  total_rent_yearly: number;
  month_data: RentalMonthData[];
}

export interface RentalApiResponse {
  data: RentalYearData[];
}
