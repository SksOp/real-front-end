import axios from "axios";
import { BASE_URL } from "./constant";
import { FormatValue } from "@/utils/formatNumbers";
import { SalesIndex } from "./sales";
import ApiService from "@/utils/apiService";

export const MonthlyProperties = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2024, end_year: 2024 },
      token
    );

    const data = response.result[0]?.month;
    console.log(data);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const chartData = data.map((item: any) => {
      return {
        month: months[item.month - 1],
        offplan: item.total_volume_offplan,
        ready: item.total_volume_ready,
      };
    });
    console.log(chartData);
    return {
      name: "Monthly Property Sales Volume",
      description:
        "Monthly comparison of sales volumes for offplan vs ready properties.",
      chart_type: "stacked_bar",
      chartConfig: {
        offplan: { color: "#F0FCF3" },
        ready: { color: "#FFEDED" },
      },
      sub_charts: [],
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Monthly Property Sales Volume",
      description:
        "Monthly comparison of sales volumes for offplan vs ready properties.",
      chart_type: "stacked_bar",
      chartConfig: {
        offplan: { color: "#F0FCF3" },
        ready: { color: "#FFEDED" },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const AnnualPropertySalesVolume = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2019, end_year: 2024 },
      token
    );

    const data = response.result;
    const chartData = data.map((item: any) => {
      return {
        year: item.year,
        value1: item.total_volume_offplan,
        value2: item.total_volume_ready,
      };
    });

    return {
      name: "Annual Property Sales Volume in All Areas",
      description: "Annual comparison of sales volumes for all areas.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],

      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Annual Property Sales Volume in All Areas",
      description: "Annual comparison of sales volumes for all areas.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const AnnualPropertySalesValue = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2019, end_year: 2024 },
      token
    );

    const data = response.result;
    const chartData = data.map((item: any) => {
      return {
        year: item.year,
        value1: item.total_worth_offplan,
        value2: item.total_worth_ready,
      };
    });

    return {
      name: "Annual Property Sales Volume in All Areas",
      description: "Annual comparison of sales volumes for all areas.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],

      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Annual Property Sales Volume in All Areas",
      description: "Annual comparison of sales volumes for all areas.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const SalesVolumeProportion = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2023, end_year: 2024 },
      token
    );

    const data1 = response.result[0];
    const data2 = response.result[1];

    const chartData = [
      {
        year: 2024,
        value1: (
          (data1.total_volume_offplan /
            (data1.total_volume_ready + data1.total_volume_offplan)) *
          100
        ).toFixed(2),
        value2: (
          (data1.total_volume_ready /
            (data1.total_volume_ready + data1.total_volume_offplan)) *
          100
        ).toFixed(2),
      },
      {
        year: 2023,
        value1: (
          (data2.total_volume_offplan /
            (data2.total_volume_ready + data2.total_volume_offplan)) *
          100
        ).toFixed(2),
        value2: (
          (data2.total_volume_ready /
            (data2.total_volume_ready + data2.total_volume_offplan)) *
          100
        ).toFixed(2),
      },
    ];
    return {
      name: "Sales Volume Proportion",
      description: "Proportion of total sales volume by area.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],

      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Sales Volume Proportion",
      description: "Proportion of total sales volume by area.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const SalesValueProportion = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2023, end_year: 2024 },
      token
    );

    const data1 = response.result[0];
    const data2 = response.result[1];

    const chartData = [
      {
        year: 2024,
        value1: (
          (data1.total_worth_offplan /
            (data1.total_worth_offplan + data1.total_worth_ready)) *
          100
        ).toFixed(2),
        value2: (
          (data1.total_worth_ready /
            (data1.total_worth_offplan + data1.total_worth_ready)) *
          100
        ).toFixed(2),
      },
      {
        year: 2023,
        value1: (
          (data2.total_worth_offplan /
            (data2.total_worth_ready + data2.total_worth_offplan)) *
          100
        ).toFixed(2),
        value2: (
          (data2.total_worth_ready /
            (data2.total_worth_ready + data2.total_worth_offplan)) *
          100
        ).toFixed(2),
      },
    ];
    return {
      name: "Sales Value Proportion",
      description: "Proportion of total sales volume by area.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],

      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Sales Volume Proportion",
      description: "Proportion of total sales volume by area.",
      chart_type: "dual_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const OffPlanPricePErSqft = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2024, end_year: 2024 },
      token
    );
    const data = response.result[0];

    const chartData = [
      {
        name: "Offplan",
        value: data.avg_price_per_sqft_offplan.toFixed(2),
        fill: "#F0FCF3",
      },
      {
        name: "Ready",
        value: data.avg_price_per_sqft_ready.toFixed(2),
        fill: "#FFEDED",
      },
    ];
    return {
      name: "Offplan Price per Sqft",
      description:
        "Average price per square foot for offplan vs ready properties.",
      chart_type: "horizontal_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],

      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Offplan Price per Sqft",
      description:
        "Average price per square foot for offplan vs ready properties.",
      chart_type: "horizontal_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const OffPlanPriceIndex = async (token?: string | null) => {
  const data = await SalesIndex({ IS_OFFPLAN_EN: "Off-Plan" }, token);
  data.sub_charts = [];
  return data;
};

export const AverageValueByRoom = async (token?: string | null) => {
  try {
    const response = await ApiService(
      "transaction",
      "offplan",
      { start_year: 2024, end_year: 2024 },
      token
    );
    const data = response.result[0];
    const chartsData = [
      {
        name: "Studio",
        value: data.avg_trans_value_studio,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: "1 BHK",
        value: data.avg_trans_value_1bhk,
        colorClass: "bg-[#E2FFEB]",
      },
      {
        name: "2 BHK",
        value: data.avg_trans_value_2bhk,
        colorClass: "bg-[#FFE2E2]",
      },
      {
        name: "3 BHK",
        value: data.avg_trans_value_3bhk,
        colorClass: "bg-[#FFF3E0]",
      },
      {
        name: "4 BHK",
        value: data.avg_trans_value_4bhk,
        colorClass: "bg-[#E5F2FF]",
      },
      {
        name: "5 BHK+",
        value: data.avg_trans_value_5bhk_plus,
        colorClass: "bg-[#FFDBDB]",
      },
      {
        name: "Penthouse",
        value: data.avg_trans_value_penthouse,
        colorClass: "bg-[#FCF8D1]",
      },
    ];
    return {
      name: "Average value by No. of rooms",
      description: "Average value of the property by no of bedrooms.",
      chart_type: "donut",
      chartConfig: {
        Studio: { color: "#FFC8C8" },
        "1 BHK": { color: "#E2FFEB" },
        "2 BHK": { color: "#FFE2E2" },
        "3 BHK": { color: "#FFF3E0" },
        "4 BHK": { color: "#E5F2FF" },
        "5 BHK+": { color: "#FFDBDB" },
        Penthouse: { color: "#FCF8D1" },
      },
      sub_charts: [],

      data: chartsData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Average value by No. of rooms",
      description: "Average value of the property by no of bedrooms.",
      chart_type: "donut",
      chartConfig: {
        Studio: { color: "#FFC8C8" },
        "1 BHK": { color: "#E2FFEB" },
        "2 BHK": { color: "#FFE2E2" },
        "3 BHK": { color: "#FFF3E0" },
        "4 BHK": { color: "#E5F2FF" },
        "5 BHK+": { color: "#FFDBDB" },
        Penthouse: { color: "#FCF8D1" },
      },
      sub_charts: [],

      data: [], // Calculated data will be here
    };
  }
};
