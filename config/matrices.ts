import { ChartDescription, MatrixData, PageFilter } from "./types";
import { SalesMatrices } from "./salesMatrices";
import { RentalMatrices } from "./rentalMatrices";
import { OffPlanMatrices } from "./offplanMatrices";
import { SupplyMatrices } from "./supplyMatrices";
import { SalesIndexMatrices } from "./sales_indexMatrices";

export interface Matrix {
  key: string;
  title: string;
  description: string;
  type: "sales" | "rentals" | "supply" | "offplan" | "sales_index";
  tag?: string;
  filters?: PageFilter[];
  calculate_charts?: {
    key: string;
    calculate: (params: {
      [key: string]: string | number;
    }) => Promise<ChartDescription> | Promise<MatrixData>;
  };
}

export const KeyMatrices: Matrix[] = [
  ...SalesMatrices,
  ...RentalMatrices,
  ...SupplyMatrices,
  ...OffPlanMatrices,
  ...SalesIndexMatrices,
];
