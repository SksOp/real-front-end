// types/calculatorTypes.ts

import { ChartConfig } from "@/components/ui/chart";

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
    | "estimationCard"
    | "pie_chart"
    | "stacked_bar_chart"
    | "line_chart"
    | "table"
    | "bar_chart";
  chartConfig?: ChartConfig;
  subChart?: SubChart[];
}

export interface Calculator {
  key: string;
  name: string;
  description: string;
  inputs: InputField[];
  outputs: OutputField[];
  calculate: (inputs: Record<string, any>) => Record<string, any>;
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

// Type for a metric or chart in the dashboard
export interface Chart {
  key: string;
  name: string;
  description?: string;
  filters?: string[];
  chartConfig?: ChartConfig;
  chart_type?:
    | "bar"
    | "line"
    | "donut"
    | "pie"
    | "stacked_bar"
    | "percentile_bar"
    | "table"
    | "comparison_table"
    | "horizontal_bar";
  sub_metrics?: Chart[];
  api_endpoint?: string;
  calculate?: (inputs: Record<string, any>) => Record<string, any>;
  view_more?: boolean;
  insights?: string;
}

// Type for the dashboard_filters object
export interface DashboardFilters {
  usage: "residential" | "commercial" | null;
  mode: "sales" | "rental" | null;
}

export interface MatrixData {
  key: string;
  title: string;
  value: string | number;
  growth: string | number;
}

// Type for a dashboard object
export interface Dashboard {
  key: string;
  name: string;
  description: string;
  type: "standard" | "custom";
  label?: string;
  dashboard_filters?: DashboardFilters;
  page_filters: Filter[];
  matrics: MatrixData[];
  charts: Chart[];
}
