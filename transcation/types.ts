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
  [year: string]: {
    [month: string]: { Transactions: string | number };
  };
}

export interface TransactionVsSalesType {
  [year: string]: {
    [month: string]: {
      sales: number;
      Transactions: number;
    };
  };
}

export interface salesMonthlyAverage {
  [year: string]: { [monthNumber: number]: number };
}
export interface MonthlyAveragePropertyArea {
  [year: string]: { [monthName: string]: number };
}

export interface LocationSalesTransaction {
  [year: string]: {
    [month: string]: {
      [location: string]: {
        sales: number;
        Transactions: number;
      };
    };
  };
}

export interface BedroomType {
  [year: string]: {
    [month: string]: {
      [bedrooms: string]: {
        property_count: number;
      };
    };
  };
}

export interface ResidentialVsCommercialType {
  [year: string]: {
    [month : string]: { 
      [usage: string]:{
        property_count: number;
      };
    }
  };
}

export interface FreeholdVsLeaseType {
  [year: string]: {
    [month : string]: { 
      [tenure: string]: number;
    }
  };
}

export interface OffplanvsReadyType {
  [year: string]: {
    [month : string]: { 
      [status: string]: number;
    }
  };
}

export interface fetchSalesIndexBenchmarkType {
  years: string;
  quarters : string;
  months :string
}

export interface IQRType{
  Percentile_25: number;
   Percentile_75: number
}
