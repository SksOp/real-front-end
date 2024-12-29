import axios from "axios";
import { BASE_URL } from "./constant";
import { FormatValue } from "@/utils/formatNumbers";

export const YearlyCompletedUnits = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects/details`, {
      params: params,
    });

    const data = response.data.data[0]?.breakdown;
    console.log(data);
    const chartData = data.map((item: any) => {
      return {
        year: item.year,
        value: item.completed_projects,
      };
    });

    const insights = `${FormatValue(
      chartData[chartData.length - 1].value
    )} units were completed this year, up 15% from last year.`;

    return {
      name: "Number of Yearly Completed Units",
      description: "Total number of units completed each year.",
      chart_type: "bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights: insights,
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Number of Yearly Completed Units",
      description: "Total number of units completed each year.",
      chart_type: "bar",
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

export const YearlyLaunchedProperties = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects/details`, {
      params: params,
    });

    const data = response.data.data[0]?.breakdown;

    const chartData = data.map((item: any) => {
      return {
        year: item.year,
        value: item.total_projects,
      };
    });
    const insights = `${FormatValue(
      chartData[chartData.length - 1].value
    )} units were launched this year, marking a ${(
      (chartData[chartData.length - 1].value -
        chartData[chartData.length - 2].value) /
      chartData[chartData.length - 2].value
    ).toFixed(2)}% increase`;
    return {
      name: "Number of Yearly Launched Properties",
      description: "Total properties launched annually.",
      chart_type: "bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights: insights,
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Number of Yearly Launched Properties",
      description: "Total properties launched annually.",
      chart_type: "bar",
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

export const FuturePlannedSupply = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/projects/details?start_year=2024&end_year=100000`,
      {
        params: params,
      }
    );

    const data = response.data.data[0]?.breakdown;
    const chartData = data.map((item: any) => {
      return {
        year: item.year,
        value: item.total_projects_new_supply,
      };
    });
    const insights = `${FormatValue(
      chartData[0].value
    )} units are planned for delivery starting in ${chartData[0].year}.`;
    return {
      name: "Number of Yearly Launched Properties",
      description: "Total properties launched annually.",
      chart_type: "bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights: insights,
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Number of Yearly Launched Properties",
      description: "Total properties launched annually.",
      chart_type: "bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: [], // Calculated data will be here
    };
  }
};

export const SupplyByPriceRanges = async (params: {
  [key: string]: string | number;
}) => {
  try {
    // const response = await axios.get(
    //   `${BASE_URL}/api/projects/price-range`,
    //   { params: params }
    // );

    // const data = response.data.data[0].price_range;

    const chartData = [
      {
        name: "<100K",
        value: 4000,
        colorClass: "bg-[#FFDBDB]",
      },
      {
        name: "200K to 400k",
        value: 6800,
        colorClass: "bg-[#EFEEFC]",
      },
      {
        name: "500k to 1M",
        value: 5200,
        colorClass: "bg-[#DDF8E4]",
      },
      {
        name: "1M to 2M",
        value: 4000,
        colorClass: "bg-[#FCF8D1]",
      },
    ];
    console.log(chartData);
    return {
      name: "Supply by Price Range",
      description:
        "Distribution of property supply across various price ranges.",
      chart_type: "donut",
      chartConfig: {
        "<100K": { color: "#FFDBDB" },
        "200K to 400k": { color: "#EFEEFC" },
        "500k to 1M": { color: "#DDF8E4" },
        "1M to 2M": { color: "#FCF8D1" },
      },
      sub_charts: [],
      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Supply by Price Range",
      description:
        "Distribution of property supply across various price ranges.",
      chart_type: "donut",
      chartConfig: {
        "<100K": { color: "#FFDBDB" },
        "200K to 400k": { color: "#EFEEFC" },
        "500k to 1M": { color: "#DDF8E4" },
        "1M to 2M": { color: "#FCF8D1" },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const FuturePropertySupplyPerArea = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects/futureSupply`, {
      params: params,
    });

    const data = response.data.data;

    const chartData = data.map((item: any) => {
      return {
        name: item.area,
        value: item.total_projects_new_supply,
        fill: "#DDF8E4",
      };
    });
    console.log(chartData);
    return {
      name: "Future Property Supply per Area",
      description: "Forecasted supply of properties by area.",
      chart_type: "horizontal_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      view_all: true,
      otherInfo: [{ key: "insideText", value: true }],
      sub_charts: [],

      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Future Property Supply per Area",
      description: "Forecasted supply of properties by area.",
      chart_type: "bar",
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

export const DeliveredUnitsPerAreaDubai = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects/delveredUnits`, {
      params: params,
    });

    const data = response.data.data;

    const chartData = data.map((item: any) => {
      return {
        name: item.area,
        value: item.total_projects_new_supply,
        fill: "#DDF8E4",
      };
    });
    console.log(chartData);
    return {
      name: "Delivered Units in Dubai per Area",
      description: "Total units delivered per area in Dubai.",
      chart_type: "horizontal_bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      otherInfo: [{ key: "insideText", value: true }],
      sub_charts: [],
      view_all: true,
      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Delivered Units in Dubai per Area",
      description: "Total units delivered per area in Dubai.",
      chart_type: "bar",
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

export const PlannedPropertiesByCompletionPercentage = async (params: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/projects/compPercent`, {
      params: params,
    });

    const data = response.data.data;

    const colors = [
      "#EFEEFC",
      "#DDF8E4",
      "#FFDBDB",
      "#E5F2FF",
      "#FFE2E2",
      "#FFF3E0",
      "#E2FFEB",
      "#E2FFEB",
      "#FFE2E2",
      "#FFE2E2",
    ];

    const chartData = data.map((item: any, idx: number) => {
      return {
        name: item.completion_range,
        value: item.planned_properties,
        colorClass: `bg-[${colors[idx]}]`,
      };
    });
    chartData.shift();
    console.log(chartData);
    return {
      name: "Planned properties by Completion Percentage",
      description:
        "Doughnut chart to visualise percentage distribution of planned projects.",
      chart_type: "donut",
      chartConfig: {
        "0-10": { color: "#EFEEFC" },
        "10-20": { color: "#DDF8E4" },
        "20-30": { color: "#FFDBDB" },
        "30-40": { color: "#E5F2FF" },
        "40-50": { color: "#FFE2E2" },
        "50-60": { color: "#FFF3E0" },
        "60-70": { color: "#E2FFEB" },
        "70-80": { color: "#E2FFEB" },
        "80-90": { color: "#FFE2E2" },
        "90-100": { color: "#FFE2E2" },
      },
      sub_charts: [],
      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error(error);
    return {
      name: "Planned properties by Completion Percentage",
      description:
        "Doughnut chart to visualise percentage distribution of planned projects.",
      chart_type: "donut",
      chartConfig: {
        "0-10": { color: "#EFEEFC" },
        "10-20": { color: "#DDF8E4" },
        "20-30": { color: "#FFDBDB" },
        "30-40": { color: "#E5F2FF" },
        "40-50": { color: "#FFE2E2" },
        "50-60": { color: "#FFF3E0" },
        "60-70": { color: "#E2FFEB" },
        "70-80": { color: "#E2FFEB" },
        "80-90": { color: "#FFE2E2" },
        "90-100": { color: "#FFE2E2" },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};
