import axios from "axios";
import { BASE_URL } from "./constant";
import { FormatValue } from "@/utils/formatNumbers";
import ApiService from "@/utils/apiService";

export const OverallSalesIndex = async (token?: string | null) => {
  try {
    const response = await ApiService("index", "", { type: "all" }, token);
    const data = response.result;
    console.log("data", data);
    const yearlyData = data.yearly.map((year: any) => {
      return {
        year: year.year,
        value1: year.months[0].all_yearly_index,
      };
    });

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

    const monthlyData = data.monthly[12].months.map((month: any) => {
      return {
        year: months[month.month - 1],
        value1: month.all_monthly_index,
      };
    });

    const quarterlyData = data.quarterly[12].months.map(
      (quarter: any, idx: number) => {
        return {
          year: `Q${idx + 1}`,
          value1: quarter.all_quarterly_index,
        };
      }
    );
    console.log("yearlyData", yearlyData);

    return {
      name: "Overall Sales Index",
      description:
        "Sales index for overall units regardless property type based on comparison with previous years and base year 2012",
      filters: [
        { key: "yearly", label: "Yearly", data: yearlyData },
        { key: "monthly", label: "Monthly", data: monthlyData },
        {
          key: "quarterly",
          label: "Quarterly",
          data: quarterlyData,
        },
      ],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: yearlyData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Overall Sales Index",
      description:
        "Sales index for overall units regardless property type based on comparison with previous years and base year 2012",
      filters: [],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: [], // Calculated data will be here
    };
  }
};

export const OverallSalesValue = async (token?: string | null) => {
  try {
    const response = await ApiService("index", "", { type: "all" }, token);
    const data = response.result;
    console.log("data", data);
    const yearlyData = data.yearly.map((year: any) => {
      return {
        year: year.year,
        value1: year.months[0].all_yearly_price_index,
      };
    });

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

    const monthlyData = data.monthly[12].months.map((month: any) => {
      return {
        year: months[month.month - 1],
        value1: month.all_monthly_price_index,
      };
    });

    const quarterlyData = data.quarterly[12].months.map(
      (quarter: any, idx: number) => {
        return {
          year: `Q${idx + 1}`,
          value1: quarter.all_quarterly_price_index,
        };
      }
    );
    console.log("yearlyData", yearlyData);

    return {
      name: "Overall Sales Value",
      description:
        "Sales Value for overall units regardless property type based on comparison with previous years and base year 2012",
      filters: [
        { key: "yearly", label: "Yearly", data: yearlyData },
        { key: "monthly", label: "Monthly", data: monthlyData },
        {
          key: "quarterly",
          label: "Quarterly",
          data: quarterlyData,
        },
      ],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: yearlyData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Overall Sales Value",
      description:
        "Sales Value for overall units regardless property type based on comparison with previous years and base year 2012",
      filters: [],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: [], // Calculated data will be here
    };
  }
};

export const VillaSalesIndex = async (token?: string | null) => {
  try {
    const response = await ApiService("index", "", { type: "all" }, token);
    const data = response.result;
    console.log("data", data);
    const yearlyData = data.yearly.map((year: any) => {
      return {
        year: year.year,
        value1: year.months[0].villa_yearly_index,
      };
    });

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

    const monthlyData = data.monthly[12].months.map((month: any) => {
      return {
        year: months[month.month - 1],
        value1: month.villa_monthly_index,
      };
    });

    const quarterlyData = data.quarterly[12].months.map(
      (quarter: any, idx: number) => {
        return {
          year: `Q${idx + 1}`,
          value1: quarter.villa_quarterly_index,
        };
      }
    );
    console.log("yearlyData", yearlyData);

    return {
      name: "Villa Sales Index",
      description:
        "Sales index for villas based on comparison with previous years and base year 2012",
      filters: [
        { key: "monthly", label: "Monthly", data: monthlyData },
        {
          key: "quarterly",
          label: "Quarterly",
          data: quarterlyData,
        },
        { key: "yearly", label: "Yearly", data: yearlyData },
      ],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: monthlyData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Villa Sales Index",
      description:
        "Sales index for villas based on comparison with previous years and base year 2012",
      filters: [],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: [], // Calculated data will be here
    };
  }
};

export const VillaSalesValue = async (token?: string | null) => {
  try {
    const response = await ApiService("index", "", { type: "all" }, token);
    const data = response.result;
    console.log("data", data);
    const yearlyData = data.yearly.map((year: any) => {
      return {
        year: year.year,
        value1: year.months[0].villa_yearly_price_index,
      };
    });

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

    const monthlyData = data.monthly[12].months.map((month: any) => {
      return {
        year: months[month.month - 1],
        value1: month.villa_monthly_price_index,
      };
    });

    const quarterlyData = data.quarterly[12].months.map(
      (quarter: any, idx: number) => {
        return {
          year: `Q${idx + 1}`,
          value1: quarter.villa_quarterly_price_index,
        };
      }
    );
    console.log("yearlyData", yearlyData);

    return {
      name: "Villa Sales Value",
      description:
        "Sales Value for villa units regardless property type based on comparison with previous years and base year 2012",
      filters: [
        { key: "monthly", label: "Monthly", data: monthlyData },
        {
          key: "quarterly",
          label: "Quarterly",
          data: quarterlyData,
        },
        { key: "yearly", label: "Yearly", data: yearlyData },
      ],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: monthlyData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Villa Sales Value",
      description:
        "Sales Value for villa units regardless property type based on comparison with previous years and base year 2012",
      filters: [],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: [], // Calculated data will be here
    };
  }
};

export const FlatSalesIndex = async (token?: string | null) => {
  try {
    const response = await ApiService("index", "", { type: "all" }, token);
    const data = response.result;
    console.log("data", data);
    const yearlyData = data.yearly.map((year: any) => {
      return {
        year: year.year,
        value1: year.months[0].flat_yearly_index,
      };
    });

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

    const monthlyData = data.monthly[12].months.map((month: any) => {
      return {
        year: months[month.month - 1],
        value1: month.flat_monthly_index,
      };
    });

    const quarterlyData = data.quarterly[12].months.map(
      (quarter: any, idx: number) => {
        return {
          year: `Q${idx + 1}`,
          value1: quarter.flat_quarterly_index,
        };
      }
    );
    console.log("yearlyData", yearlyData);

    return {
      name: "Flat Sales Index",
      description:
        "Sales index for flat based on comparison with previous years and base year 2012",
      filters: [
        { key: "monthly", label: "Monthly", data: monthlyData },
        {
          key: "quarterly",
          label: "Quarterly",
          data: quarterlyData,
        },
        { key: "yearly", label: "Yearly", data: yearlyData },
      ],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: monthlyData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Flat Sales Index",
      description:
        "Sales index for flat based on comparison with previous years and base year 2012",
      filters: [],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: [], // Calculated data will be here
    };
  }
};

export const FlatSalesValue = async (token?: string | null) => {
  try {
    const response = await ApiService("index", "", { type: "all" }, token);
    const data = response.result;
    console.log("data", data);
    const yearlyData = data.yearly.map((year: any) => {
      return {
        year: year.year,
        value1: year.months[0].flat_yearly_price_index,
      };
    });

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

    const monthlyData = data.monthly[12].months.map((month: any) => {
      return {
        year: months[month.month - 1],
        value1: month.flat_monthly_price_index,
      };
    });

    const quarterlyData = data.quarterly[12].months.map(
      (quarter: any, idx: number) => {
        return {
          year: `Q${idx + 1}`,
          value1: quarter.flat_quarterly_price_index,
        };
      }
    );
    console.log("yearlyData", yearlyData);

    return {
      name: "Flat Sales Value",
      description:
        "Sales Value for flat units regardless property type based on comparison with previous years and base year 2012",
      filters: [
        { key: "monthly", label: "Monthly", data: monthlyData },
        {
          key: "quarterly",
          label: "Quarterly",
          data: quarterlyData,
        },
        { key: "yearly", label: "Yearly", data: yearlyData },
      ],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: monthlyData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Flat Sales Value",
      description:
        "Sales Value for flat units regardless property type based on comparison with previous years and base year 2012",
      filters: [],
      chart_type: "line",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: [], // Calculated data will be here
    };
  }
};
