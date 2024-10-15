// types/calculatorTypes.ts

export interface InputField {
  key: string;
  type:
    | "property_selector"
    | "radio"
    | "dropdown"
    | "slider"
    | "currency_text"
    | "auto_computed"
    | "value";
  is_mandatory: boolean;
  label: string;
  placeholder?: string;
  options?: (string | number)[];
  source?: string;
  searchable?: boolean;
  min?: number;
  max?: number;
  step?: number;
  default_value?: string | number;
  helper_text?: string;
}

export interface OutputField {
  key: string;
  label: string;
  type:
    | "metric"
    | "insights"
    | "pie_chart"
    | "stacked_bar_chart"
    | "multi_line_smooth_bar_chart"
    | "table"
    | "bar_chart";
}

export interface Calculator {
  key: string;
  name: string;
  description: string;
  inputs: InputField[];
  outputs: OutputField[];
}
