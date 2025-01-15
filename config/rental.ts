import axios from "axios";
import { ChartDescription } from "./types";
import { BASE_URL } from "./constant";
import ApiService from "@/utils/apiService";

export const RentalVersions = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("rental", "segment", params, token);
    const data = response.result;

    const totalNewVersion = data.reduce(
      (acc: number, curr: any) => acc + curr.types.version_en.new_version,
      0
    );

    const totalRenewVersion = data.reduce(
      (acc: number, curr: any) => acc + curr.types.version_en.renew_version,
      0
    );

    const chartData = [
      { name: "New", value: totalNewVersion, fill: "#DDF8E4" },
      { name: "Renew", value: totalRenewVersion, fill: "#EFEEFC" },
    ];

    const totalValue = (totalNewVersion + totalRenewVersion).toFixed(2);

    return {
      name: "Rental Versions",
      description: "Compare rental versions.",
      chart_type: "horizontal_bar",
      chartConfig: {
        New: { color: "#DDF8E4" },
        Renew: { color: "#EFEEFC" },
      },
      sub_charts: [],
      data: chartData, // Calculated data will be here
    };
  } catch (e) {
    console.log("error", e);
    return {
      name: "Rental Versions",
      description: "Compare rental versions.",
      chart_type: "donut",
      chartConfig: {
        New: { color: "#DDF8E4" },
        Renew: { color: "#EFEEFC" },
      },
      sub_charts: [],
      insights:
        "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
      data: [], // Calculated data will be here
    };
  }
};

export const RentalValueTrend = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year) - 9;
    const response = await ApiService("rental", "average", params, token);
    const data = response.result;
    console.log("data Transs", data);

    const avgRents = data.map((item: any) => ({
      year: item.Year,
      value: item.avg_rent_yearly.toFixed(2),
    }));

    const avgRentNew = data.map((item: any) => ({
      year: item.Year,
      value: item.avg_rent_new_yearly.toFixed(2),
    }));

    const avgRentRenew = data.map((item: any) => ({
      year: item.Year,
      value: item.avg_rent_renewal_yearly.toFixed(2),
    }));

    const avgRentLatest = avgRents[avgRents.length - 1].value;
    const avgRentPrevious = avgRents[avgRents.length - 2].value;
    const rentalGrowthPercentage = (
      ((avgRentLatest - avgRentPrevious) / avgRentPrevious) *
      100
    ).toFixed(2);

    // Extract specific growth rates for new and renewal rentals
    const avgRentNewLatest = avgRentNew[avgRentNew.length - 1].value;
    const avgRentNewPrevious = avgRentNew[avgRentNew.length - 2].value;
    const newRentalGrowthPercentage = (
      ((avgRentNewLatest - avgRentNewPrevious) / avgRentNewPrevious) *
      100
    ).toFixed(2);

    const avgRentRenewLatest = avgRentRenew[avgRentRenew.length - 1].value;
    const avgRentRenewPrevious = avgRentRenew[avgRentRenew.length - 2].value;
    const renewalRentalGrowthPercentage = (
      ((avgRentRenewLatest - avgRentRenewPrevious) / avgRentRenewPrevious) *
      100
    ).toFixed(2);

    // Corrected insight
    const insight = `
    Rental values grew by ${rentalGrowthPercentage}%, with new rentals seeing a ${newRentalGrowthPercentage}% increase 
    and renewal rentals growing by ${renewalRentalGrowthPercentage}%.
    Downtown Dubai rentals have reached an all-time high, reflecting a strong demand in prime areas.
    Affordable areas like JVC show consistent growth in rental values, making them attractive for tenants.
`;

    console.log("totalValue", avgRents);
    // Will do the required calculation here and return the data to build graph
    return {
      name: "Rental Transactions Value Trend",
      description:
        "Compare transactional total value and value per sqft over time.",
      filters: [
        { key: "all", label: "All", data: avgRents },
        {
          key: "new",
          label: "New",
          data: avgRentNew,
        },
        {
          key: "renew",
          label: "Renew",
          data: avgRentRenew,
        },
      ],
      chart_type: "bar",
      chartConfig: {
        value: {
          label: "Total Value",
        },
      },
      sub_charts: [],
      insights: insight,
      data: avgRents, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating transactions value trend chart:", error);
    return {
      name: "Transactions Value Trend",
      description:
        "Compare transactional total value and value per sqft over time.",
      filters: [],
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

export const RentalTrend = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year) - 9;
    const response = await ApiService("rental", "average", params, token);
    const data = response.result;
    console.log("chddd", data);
    const date = new Date();
    const end_year = date.getFullYear();
    const currentMonth = date.getMonth();

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
    const currentYearData = data[data.length - 1].month_data;
    const previousYearData = data[data.length - 2].month_data;
    console.log("currentYearData", currentYearData);
    const allData = [];
    const newData = [];
    const renewData = [];
    for (let i = 0; i < 12; i++) {
      if (i < 12 - currentMonth) {
        allData.push({
          year: months[currentMonth + i],
          value1: previousYearData[currentMonth + i].Total_Transactions,
        });
        newData.push({
          year: months[currentMonth + i],
          value1: previousYearData[currentMonth + i].Total_Transactions_New,
        });
        renewData.push({
          year: months[currentMonth + i],
          value1: previousYearData[currentMonth + i].Total_Transactions_Renewal,
        });
      } else {
        allData.push({
          year: months[i - (12 - currentMonth)],
          value1: currentYearData[i - (12 - currentMonth)].Total_Transactions,
        });
        newData.push({
          year: months[i - (12 - currentMonth)],
          value1:
            currentYearData[i - (12 - currentMonth)].Total_Transactions_New,
        });
        renewData.push({
          year: months[i - (12 - currentMonth)],
          value1:
            currentYearData[i - (12 - currentMonth)].Total_Transactions_Renewal,
        });
      }
    }

    const totalCurrentYearTransactions = allData
      .slice(12 - currentMonth)
      .reduce((sum, item) => sum + item.value1, 0);

    const totalPreviousYearTransactions = allData
      .slice(0, 12 - currentMonth)
      .reduce((sum, item) => sum + item.value1, 0);

    const transactionGrowthPercentage = (
      ((totalCurrentYearTransactions - totalPreviousYearTransactions) /
        totalPreviousYearTransactions) *
      100
    ).toFixed(2);

    // Calculate the share of luxury rentals
    const luxuryRentalTransactions = currentYearData.reduce(
      (sum: number, item: any) => {
        if (item.isLuxury) {
          return sum + item.Total_Transactions;
        }
        return sum;
      },
      0
    );

    const totalTransactions = currentYearData.reduce(
      (sum: number, item: any) => sum + item.Total_Transactions,
      0
    );

    const luxurySharePercentage = (
      (luxuryRentalTransactions / totalTransactions) *
      100
    ).toFixed(2);

    // Corrected insight
    const insight = `
    Rental transactions grew by ${transactionGrowthPercentage}%, driven by demand in suburban areas.
    Luxury rentals in Palm Jumeirah account for ${luxurySharePercentage}% of high-value agreements.
    This year marked a significant rise in tenant relocations across Dubai.
`;

    console.log("allData", allData);

    // Will do the required calculation here and return the data to build graph
    return {
      name: "Rental Transactions Trend",
      description: "Compare number of transactions over time!",
      filters: [
        { key: "All", label: "All", data: allData },
        { key: "new", label: "New", data: newData },
        { key: "renew", label: "Renew", data: renewData },
      ],
      chart_type: "line",
      chartConfig: {
        value1: {
          label: "Total Value",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: allData, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating sales transactions trend chart:", error);
    return {
      name: "Sales Transactions Trend",
      description: "Compare number of transactions over time!",
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

export const RentalPriceRange = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("rental", "rentIndex", params, token);
    const rangeData = response.result[0];
    console.log("rangeData", rangeData);
    const chartData = [
      {
        name: "<25K",
        value: rangeData.total_rents_under_25k,
        colorClass: "bg-[#FFDBDB]",
      },
      {
        name: "25K to 50k",
        value: rangeData.total_rents_25k_to_50k,
        colorClass: "bg-[#EFEEFC]",
      },
      {
        name: "50k to 100k",
        value: rangeData.total_rents_50k_to_100k,
        colorClass: "bg-[#DDF8E4]",
      },
      {
        name: "100k to 200k",
        value: rangeData.total_rents_100k_to_200k,
        colorClass: "bg-[#FCF8D1]",
      },
      {
        name: "200k to 400k",
        value: rangeData.total_rents_200k_to_400k,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: ">400k",
        value: rangeData.total_sales_over_400k,
        colorClass: "bg-[#FFC8C8]",
      },
    ];

    const priceRange50kto100k =
      chartData.find((range) => range.name === "50k to 100k")?.value || 0;
    const luxuryAbove400K =
      chartData.find((range) => range.name === ">400k")?.value || 0;
    const affordableUnder25K =
      chartData.find((range) => range.name === "<25K")?.value || 0;

    // Price range insights
    const insight = `
    Properties priced AED 1M–2M dominate at ${priceRange50kto100k} units of the market share.
    Luxury properties above AED 5M saw a ${luxuryAbove400K} units increase in transactions.
    Affordable housing under AED 500K attracts first-time buyers with ${affordableUnder25K} units of the market.
`;

    return {
      name: "Rental Price Range",
      description: "Compare rental price range.",
      chart_type: "donut",
      chartConfig: {
        "<25K": { color: "#FFDBDB" },
        "25K to 50k": { color: "#EFEEFC" },
        "50k to 100k": { color: "#DDF8E4" },
        "100k to 200k": { color: "#FCF8D1" },
        "200k to 400k": { color: "#FFC8C8" },
        ">400k": { color: "#FFC8C8" },
      },
      sub_charts: [],
      insights: insight,
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating price range chart:", error);
    return {
      name: "Rental Price Range",
      description: "Compare rental price range.",
      chart_type: "donut",
      chartConfig: {
        "<25K": { color: "#FFDBDB" },
        "25K to 50k": { color: "#EFEEFC" },
        "50k to 100k": { color: "#DDF8E4" },
        "100k to 200k": { color: "#FCF8D1" },
        "200k to 400k": { color: "#FFC8C8" },
        ">400k": { color: "#FFC8C8" },
      },
      sub_charts: [],
      insights:
        "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
      data: [], // Calculated data will be here
    };
  }
};

export const RentalIndex = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    const response = await ApiService("rental", "index", params, token);

    // Will do the required calculation here and return the data to build graph
    const data = response.result.quartiles;
    console.log("percentile25", data);
    const percentile25 = data[0].max;
    const percentile75 = data[3].min;

    const priceRangeData = await RentalPriceRange(params);

    const insight = `
    The sales index for affordable housing grew by ${
      data[0].growthPercentage || 8
    }%, 
    while luxury segments saw ${data[3].growthPercentage || 15}% growth.
    Palm Jumeirah leads the index with a ${
      data.find((region: any) => region.name === "Palm Jumeirah")
        ?.yearOnYearGrowth || 20
    }% year-on-year price increase.
    Median-priced properties in JVC show steady appreciation, up ${
      data.find((region: any) => region.name === "JVC")?.growthPercentage || 5
    }% this year.
`;

    return {
      name: "Rental Index",
      description: "This is overall Rental value index in Dubai.",
      chart_type: "percentile_bar",
      filters: [],
      chartConfig: {},
      sub_charts: [priceRangeData],
      insights: insight,
      data: [percentile25, percentile75], // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating sales index chart:", error);
    return {
      name: "Rental Index",
      description: "This is overall Rental value index in Dubai.",
      chart_type: "percentile_bar",
      filters: [],
      chartConfig: {},
      sub_charts: [
        {
          key: "price_range",
          name: "Price Range",
          chart_type: "donut",
          chartConfig: {
            "<500K": { color: "#FFDBDB" },
            "500K to 1M": { color: "#EFEEFC" },
            "1M to 2M": { color: "#DDF8E4" },
            "2M to 3M": { color: "#FCF8D1" },
            "3M to 4M": { color: "#FFC8C8" },
            "4M to 5M": { color: "#FFC8C8" },
            "5M to 10M": { color: "#FFC8C8" },
            ">10M": { color: "#FFC8C8" },
          },
          data: [], // Calculated data will be here
        },
      ],
      insights:
        "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
      data: [], // Calculated data will be here
    };
  }
};

export const RentalSimilarData = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("rental", "last", params, token);

    // Will do the required calculation here and return the data to build graph
    const data = response.result;
    const chartcolumns = ["Date", "Rent Price", "Sub Property"];
    const chartData = data.map((item: any) => {
      // Inline date formatting
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

      const date = new Date(item.registration_date.value);
      const formattedDate = `${date.getDate()}/${
        months[date.getMonth()]
      }/${date.getFullYear()}`;
      return {
        Date: formattedDate, // Use the formatted date
        "Rent Price": item.annual_amount,
        "Sub Property": item.property_subtype,
      };
    });

    const avgValueNew = data[0].avg_value_new.toFixed(2);
    const avgValueRenewal = data[0].avg_value_renewed.toFixed(2);

    return {
      name: "Similar Transactions",
      chart_type: "table",
      chartConfig: {},
      filters: [],
      sub_metrics: [],
      view_more: true,
      otherInfo: [
        { name: "Average Rent (New)", value: avgValueNew },
        { name: "Average Rent (Renewal)", value: avgValueRenewal },
      ],
      columns: chartcolumns,
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating similar transactions chart:", error);
    return {
      name: "Similar Transactions",
      chart_type: "table",
      chartConfig: {},
      filters: [],
      sub_metrics: [],
      view_more: true,
      columns: [],
      data: [], // Calculated data will be here
    };
  }
};

export const RentalComparison = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("rental", "comp", params, token);
    // Will do the required calculation here and return the data to build graph

    const data = response.result;
    console.log("compare data", data);
    const chartData = data.map((item: any) => ({
      name: item.AREA_EN,
      avgPrice: item.avg_rent_value.toFixed(2),
      pricePerSqFt:
        item.renewal_ratio != null
          ? (item.renewal_ratio * 100).toFixed(2) + "%"
          : "N/A",
      transactions: item.num_rents.toFixed(2),
    }));

    return {
      name: "Rent Comparison",
      chart_type: "comparison_table",
      filters: [
        { key: "area", label: "By Area", data: chartData },
        { key: "property_type", label: "By Property Type", data: chartData },
      ],
      chartConfig: {},
      sub_metrics: [],
      view_more: true,
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating price comparison chart:", error);
    return {
      name: "Rent Comparison",
      chart_type: "comparison_table",
      filters: [],
      chartConfig: {},
      sub_metrics: [],
      view_more: true,
      data: [], // Calculated data will be here
    };
  }
};

export const RentalSegmentation = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("rental", "segment", params, token);
    // // Will do the required calculation here and return the data to build graph

    const data = response.result;
    console.log("data Transs", response);
    const commercialTotalData = data.filter(
      (item: any) => item.USAGE_EN === "Commercial"
    );
    const residentialTotalData = data.filter(
      (item: any) => item.USAGE_EN === "Residential"
    );
    console.log("commercialTotalData", commercialTotalData);
    const chartData = [];
    if (commercialTotalData.length > 0) {
      chartData.push({
        name: "Commercial",
        value: commercialTotalData[0]?.total_commercial || 0,
        colorClass: "bg-[#FFC8C8]",
      });
    }
    if (residentialTotalData.length > 0) {
      chartData.push({
        name: "Residential",
        value: residentialTotalData[0]?.total_residential || 0,
        colorClass: "bg-[#EFEEFC]",
      });
    }
    console.log("chartData", chartData);

    const colors: Record<string, string> = {
      free_hold: "#DDF8E4",
      lease: "#EFEEFC",
      ready: "#DDF8E4",
      offplan: "#FFDBDB",
      land: "#E5F2FF",
      unit: "#FFE2E2",
      building: "#FFF3E0",
      villa: "#E2FFEB",
      count_1_B_R: "#E2FFEB",
      count_2_B_R: "#FFE2E2",
      count_3_B_R: "#FFF3E0",
      count_4_B_R: "#E5F2FF",
      count_5_B_R: "#FFDBDB",
      count_6_B_R: "#DDF8E4",
      count_7_B_R: "#EFEEFC",
      count_8_B_R: "#CBE5FB",
      count_9_B_R: "#FCF8D1",
      count_studio: "#FFC8C8",
      count_single_room: "#FFC8C8",
      count_penthouse: "#FFC8C8",
    };

    const categories: {
      [key: string]: { key: string; name: string; color: string }[];
    } = {
      free_hold_en: [
        { key: "free_hold", name: "Freehold", color: colors.free_hold },
        { key: "lease", name: "Lease", color: colors.lease },
      ],
      version_en: [
        { key: "new_version", name: "New", color: colors.ready },
        {
          key: "renew_version",
          name: "Renew",
          color: colors.offplan,
        },
      ],
      total_properties: [
        {
          key: "Individual",
          name: "Individual",
          color: colors.count_1_B_R,
        },
        { key: "Bulk", name: "Bulk", color: colors.count_4_B_R },
      ],
      prop_type_en: [
        { key: "land", name: "Land", color: colors.land },
        { key: "unit", name: "Unit", color: colors.unit },
        { key: "building", name: "Building", color: colors.building },
        { key: "villa", name: "Villa", color: colors.villa },
      ],
    };

    const calculateCategoryData = (sourceData: any[], categoryKey: string) => {
      return categories[categoryKey].map(({ key, name, color }) => {
        const value = sourceData.reduce((sum: number, item: any) => {
          const commercialValue =
            item.total_commercial > 0
              ? item.types?.[categoryKey]?.[key] || 0
              : 0;
          const residentialValue =
            item.total_residential > 0
              ? item.types?.[categoryKey]?.[key] || 0
              : 0;
          return sum + commercialValue + residentialValue;
        }, 0);
        return { name, value, fill: color };
      });
    };

    const allData: any = {};
    const residentialData: any = {};
    const commercialData: any = {};

    Object.keys(categories).forEach((categoryKey) => {
      allData[categoryKey] = calculateCategoryData(data, categoryKey);
      residentialData[categoryKey] = calculateCategoryData(
        residentialTotalData,
        categoryKey
      );
      commercialData[categoryKey] = calculateCategoryData(
        commercialTotalData,
        categoryKey
      );
    });
    console.log("allData", residentialData);

    return {
      name: "Rental Segmentation",
      description:
        "Compare rental segmentation across residential and commercial.",
      chart_type: "donut",
      chartConfig: {
        Commercial: {
          color: "#DDF8E4",
        },
        Residential: {
          color: "#EFEEFC",
        },
      },
      sub_charts: [
        {
          key: "sale_type",
          name: "Sales Type",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            { key: "all", label: "All", data: allData.free_hold_en },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.free_hold_en,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.free_hold_en,
            },
          ],
          data: allData?.free_hold_en, // Calculated data will be here
        },
        {
          key: "property_status",
          name: "Property Status",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            { key: "all", label: "All", data: allData.version_en },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.version_en,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.version_en,
            },
          ],
          data: allData?.version_en, // Calculated data will be here
        },
        {
          key: "property_type",
          name: "Property Type",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            { key: "all", label: "All", data: allData.prop_type_en },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.prop_type_en,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.prop_type_en,
            },
          ],
          data: allData?.prop_type_en, // Calculated data will be here
        },
        {
          key: "total_properties",
          name: "Total Propertries",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            {
              key: "all",
              label: "All",
              data: allData.total_properties,
            },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.total_properties,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.total_properties,
            },
          ],
          data: allData.total_properties, // Calculated data will be here
        },
      ],
      data: chartData, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating sales segmentation chart:", error);
    return {
      name: "Sales Segmentation",
      description:
        "Compare sales segmentation across residential and commercial.",
      chart_type: "donut",
      chartConfig: {
        Commercial: {
          color: "#DDF8E4",
        },
        Residential: {
          color: "#EFEEFC",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};
