export interface Transaction {
  transaction_id: string;
  instance_date: {
    value: string;
  };
  property_type_en: string;
  property_usage_en: string;
  area_name_en: string;
  rooms_en: string;
  procedure_area: number;
  actual_worth: number;
}

export interface TransactionMonthlyAverage {
  [year: string]: { [monthName: string]: number };
}

export interface TransactionAverageValues {
  [year: string]: {
    [monthName: string]: { sales: number; Transactions: number };
  };
}

export interface SalesTransactionsType {
  [year : string]: {
    [month : string]:{Transactions : string | number}
  }
}

export interface TransactionVsSalesType{
  [year: string]:{
    [month: string]: {
      sales: number;
      Transactions: number;
    }
  }
}

export interface salesMonthlyAverage {
  [year: string]: { [monthNumber: number]: number };
}
export interface MonthlyAveragePropertyArea {
  [year: string]: { [monthName: string]: number };
}

export interface LocationSalesTransaction {
  [year: string]: { [location: string]: {sales: number, Transactions: number}};
}

export interface BedroomType {
  bedrooms: string; property_count: number
}

