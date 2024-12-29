// types/calculatorTypes.ts

import { ChartConfig } from "@/components/ui/chart";
import { ClassValue } from "clsx";

export interface InputField {
  key: string;
  type:
    | "property_selector"
    | "radio"
    | "dropdown"
    | "slider"
    | "currency_text"
    | "read_only_auto_compute"
    | "value"
    | "switch"
    | "slider_with_text";
  is_mandatory: boolean;
  label: string;
  placeholder?: string;
  options?: (string | number)[] | InputField[];
  source?: string;
  searchable?: boolean;
  calculateFrom?: string[];
  calculateValue?: (value: any) => any;
  sliderText?: string;
  min?: number;
  max?: number;
  step?: number;
  default_value?: string | number;
  helper_text?: string;
}

export interface SubChart {
  key: string;
  label?: string;
  type:
    | "metric"
    | "comparison"
    | "insights"
    | "pie_chart"
    | "stacked_bar_chart"
    | "multi_line_smooth_bar_chart"
    | "table"
    | "bar_chart";
  chartConfig?: ChartConfig;
}

export interface OutputField {
  key: string;
  label: string;
  secondary_output?: OutputField;
  type:
    | "metric"
    | "comparison"
    | "insights"
    | "variable_output"
    | "estimationCard"
    | "pie_chart"
    | "stacked_bar_chart"
    | "line_chart"
    | "table"
    | "bar_chart"
    | "two_charts";
  chartConfig?: ChartConfig;
  calculateFrom?: string[];
  calculateValue?: (value: any) => any;
  subChart?: SubChart[];
  isWrapped?: boolean;
}

export interface Calculator {
  key: string;
  name: string;
  description: string;
  outputTitle?: string;
  inputs: InputField[];
  outputs: OutputField[];
  tag?: string;
  calculate: (
    inputs: Record<string, any>
  ) => Record<string, any> | Promise<Record<string, any>>;
}

// Type for filters (dashboard or metric level)
type Filter = "year" | "location" | "developer" | "property_type";

// Type for a sub-metric in charts
export interface SubMetric {
  key: string;
  name: string;
  query_params?: {
    range_start: number;
    range_end: number;
  };
  api_endpoint: string;
}

export interface SubFilters {
  key: string;
  label: string;
  data: any[];
}

export interface ChartDescription {
  name: string;
  description?: string;
  filters?: any[];
  chart_type:
    | "horizontal_bar"
    | "bar"
    | "dual_bar"
    | "pie"
    | "stacked_bar"
    | "line"
    | "area"
    | "donut"
    | "table"
    | percentile_bar;
  chartConfig: ChartConfig;
  data: any[];
  columns?: string[];
  styles?: ClassValue;
  otherInfo?: {
    name: string;
    value: string;
  }[];
  sub_charts?: Dashboard.calculate_charts;
  insights?: string;
}

// Type for the dashboard_filters object
export interface DashboardFilters {
  mode: "sales" | "rental" | null;
  usage?: "residential" | "commercial" | null;
  group_en?: "sales" | "gifts" | "mortgage" | null;
}

export interface MatrixData {
  key: string;
  title: string;
  value: string | number;
  growth?: string | number;
}

export interface PageFilter {
  key: string;
  label: string;
  source?: string;
  options?: string[];
  searchable?: boolean;
}

// Type for a dashboard object
export interface Dashboard {
  key: string;
  name: string;
  description: string;
  tag?: string;
  type: "standard" | "custom";
  label?: string;
  dashboard_filters: DashboardFilters;
  page_filters: PageFilter[];

  matrics?: MatrixData[];
  calculate_matrics?: (params: {
    [key: string]: string | number;
  }) => Promise<MatrixData[]>;
  calculate_charts?: {
    key: string;
    calculate: (params: {
      [key: string]: string | number;
    }) => Promise<ChartDescription>;
  }[];
}
