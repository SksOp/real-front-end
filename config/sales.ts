import axios from "axios";
import { BASE_URL } from "./constant";
import { FormatValue } from "@/utils/formatNumbers";
import ApiService from "@/utils/apiService";

export const SalesTypeChart = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("transaction", "types", params, token);
    // Will do the required calculation here and return the data to build graph
    const data = response.result;
    console.log("data Transs", data);
    const totalSalesSum = data.reduce(
      (acc: number, curr: any) => acc + curr.types.group_en.total_sales,
      0
    );

    const totalMortageSum = data.reduce(
      (acc: number, curr: any) => acc + curr.types.group_en.total_mortgage,
      0
    );

    const totalGiftSum = data.reduce(
      (acc: number, curr: any) => acc + curr.types.group_en.total_gift,
      0
    );

    const chartData = [
      { name: "Cash", value: totalSalesSum, fill: "#DDF8E4" },
      { name: "Mortgage", value: totalMortageSum, fill: "#EFEEFC" },
      { name: "Gifts", value: totalGiftSum, fill: "#FFDBDB" },
    ];

    const totalValue = (totalGiftSum + totalMortageSum + totalSalesSum).toFixed(
      2
    );

    const insight = `
        Cash sales dominate at ${((totalSalesSum / totalValue) * 100).toFixed(
          2
        )}%, attracting global investors seeking liquidity.
        Mortgage transactions have grown to ${(
          (totalMortageSum / totalValue) *
          100
        ).toFixed(2)}%, reflecting favorable financing options.
        Gift transactions remain minimal, accounting for less than ${(
          (totalGiftSum / totalValue) *
          100
        ).toFixed(2)}% of the market.
    `;

    return {
      name: "Transactions Type",
      filters: [],
      chart_type: "horizontal_bar",
      chartConfig: {
        Cash: {
          color: "#DDF8E4",
        },
        Mortgage: {
          color: "#EFEEFC",
        },
        Gifts: {
          color: "#FFDBDB",
        },
      },
      styles: "min-h-[100px]",
      sub_charts: [],
      data: chartData, // Calculated data will be here
      insights: insight,
    };
  } catch (error) {
    console.error("Error calculating transactions type chart:", error);
    return {
      name: "Transactions Type",
      filters: [],
      chart_type: "horizontal_bar",
      chartConfig: {
        Cash: {
          color: "#DDF8E4",
        },
        Mortgage: {
          color: "#EFEEFC",
        },
        Gifts: {
          color: "#FFDBDB",
        },
      },
      sub_charts: [],
      data: [], // Calculated data will be here
    };
  }
};

export const SalesValueTrend = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year) - 9;
    const response = await ApiService("transaction", "trends", params, token);

    console.log("response barrr", response.result);
    const data = response.result || [];

    const totalValue = data.map((item: any) => ({
      year: item.Year,
      value: item.Total_Value_of_Transaction?.toFixed(2) || "0.00",
    }));

    const pricePerSqft = data.map((item: any) => ({
      year: item.Year,
      value: item.average_Price_per_sqft?.toFixed(2) || "0.00",
    }));

    console.log("totalValue", totalValue);

    const lastYear =
      totalValue.length > 0
        ? parseFloat(totalValue[totalValue.length - 1].value)
        : 0;
    const secondLastYear =
      totalValue.length > 1
        ? parseFloat(totalValue[totalValue.length - 2].value)
        : 0;
    const total = (lastYear + secondLastYear).toFixed(2);
    const growth =
      lastYear > 0 && secondLastYear > 0
        ? ((lastYear / (lastYear + secondLastYear)) * 100).toFixed(2)
        : "0.00";

    const insight =
      totalValue.length > 1
        ? `Dubai’s GMV grew by ${FormatValue(
            growth
          )}% this year, reaching new highs in luxury transactions. Off-plan properties show the fastest growth in transaction value. The total market value crossed AED ${FormatValue(
            lastYear
          )}, up from AED ${FormatValue(secondLastYear)} last year.`
        : "Insufficient data to generate insights.";

    return {
      name: "Transactions Value Trend",
      description:
        "Compare transactional total value and value per sqft over time.",
      filters: [
        { key: "total_value", label: "Total Value", data: totalValue },
        {
          key: "price_per_sqft",
          label: "Value per SQFT",
          data: pricePerSqft,
        },
      ],
      chart_type: "bar",
      chartConfig: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights: insight,
      data: totalValue,
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
      insights: "Insufficient data to generate insights.",
      data: [],
    };
  }
};

export const SalesTrend = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year) - 9;
    const response = await ApiService("transaction", "trends", params, token);
    const data = response.result || [];
    console.log("chddd", data);

    const yearlyData = data.map((item: any) => ({
      year: item.Year,
      value1: item.number_of_Row_Used || 0,
    }));

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
    const currentYearData = data[data.length - 1] || { month_data: [] };
    const monthlyData =
      currentYearData.month_data?.map((item: any) => ({
        year: months[parseInt(item.Month) - 1],
        value1: item.number_of_Row_Used || 0,
      })) || [];
    let lastMonth = parseInt(currentYearData.month_data[0].Month) - 1;
    while (monthlyData.length < 12) {
      const prevYearData = data[data.length - 2]?.month_data || [];
      const missingMonth = prevYearData[11 - monthlyData.length];
      monthlyData.unshift({
        year: months[parseInt(missingMonth?.Month || lastMonth--) - 1],
        value1: missingMonth?.number_of_Row_Used || 0,
      });
    }

    const quarterlyData = [];
    for (let j = Math.max(0, data.length - 3); j < data.length; j++) {
      const yearData = data[j]?.month_data || [];
      for (let q = 0; q < 4; q++) {
        const startMonth = q * 3;
        const endMonth = startMonth + 3;
        const quarterMonths = yearData.slice(startMonth, endMonth);

        const quarterValue = quarterMonths.reduce(
          (sum: number, item: any) => sum + (item.number_of_Row_Used || 0),
          0
        );

        quarterlyData.push({
          year: `Q${q + 1} ${data[j]?.Year || ""}`,
          value1: quarterValue,
        });
      }
    }

    const totalTransactionsCurrentYear =
      yearlyData[yearlyData.length - 1]?.value1 || 0;
    const totalTransactionsPreviousYear =
      yearlyData[yearlyData.length - 2]?.value1 || 0;
    const totalGrowthPercentage =
      totalTransactionsPreviousYear > 0
        ? (
            ((totalTransactionsCurrentYear - totalTransactionsPreviousYear) /
              totalTransactionsPreviousYear) *
            100
          ).toFixed(2)
        : "0.00";

    const busiestMonth = monthlyData.reduce(
      (max: any, item: any) => (item.value1 > max.value1 ? item : max),
      { year: "N/A", value1: 0 }
    );

    const insights =
      yearlyData.length > 1
        ? `Total transactions rose by ${totalGrowthPercentage}%, with off-plan sales growing at a remarkable rate. ${busiestMonth.year} marked the busiest month with over ${busiestMonth.value1} transactions.`
        : "Insufficient data to generate insights.";

    return {
      name: "Sales Transactions Trend",
      description: "Compare number of transactions over time!",
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
      insights: insights,
      data: monthlyData,
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
      insights: "Insufficient data to generate insights.",
      data: [],
    };
  }
};

export const SalesPriceRanges = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService(
      "transaction",
      "salesIndex",
      params,
      token
    );
    const rangeData = response.result[0];
    console.log("rangeData", rangeData);

    const chartData = [
      {
        name: "<500K",
        value: rangeData.total_sales_under_500k,
        colorClass: "bg-[#FFDBDB]",
      },
      {
        name: "500K to 1M",
        value: rangeData.total_sales_500k_to_1M,
        colorClass: "bg-[#EFEEFC]",
      },
      {
        name: "1M to 2M",
        value: rangeData.total_sales_1M_to_2M,
        colorClass: "bg-[#DDF8E4]",
      },
      {
        name: "2M to 3M",
        value: rangeData.total_sales_2M_to_3M,
        colorClass: "bg-[#FCF8D1]",
      },
      {
        name: "3M to 4M",
        value: rangeData.total_sales_3M_to_4M,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: "4M to 5M",
        value: rangeData.total_sales_4M_to_5M,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: "5M to 10M",
        value: rangeData.total_sales_5M_to_10M,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: ">10M",
        value: rangeData.total_sales_over_10M,
        colorClass: "bg-[#FFC8C8]",
      },
    ];
    const priceRange1MTo2M =
      chartData.find((range) => range.name === "1M to 2M")?.value || 0;
    const luxuryAbove5M =
      chartData.find((range) => range.name === ">10M")?.value || 0;
    const affordableUnder1M =
      chartData.find((range) => range.name === "<500K")?.value || 0;

    // Price range insights
    const insight = `
    Properties priced AED 1M–2M dominate at ${priceRange1MTo2M} units of the market share.
    Luxury properties above AED 5M saw a ${luxuryAbove5M} units increase in transactions.
    Affordable housing under AED 500K attracts first-time buyers with ${affordableUnder1M} units of the market.
`;

    return {
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
      data: chartData, // Calculated data will be here
      insights: insight,
    };
  } catch (error) {
    console.error("Error calculating price range chart:", error);
    return {
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
    };
  }
};

export const SalesIndex = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("transaction", "index", params, token);

    // Will do the required calculation here and return the data to build graph
    const data = response.result.quartiles;
    console.log("percentile25", data);
    const percentile25 = data[0].max;
    const percentile75 = data[3].min;
    const priceRangeData = await SalesPriceRanges(params, token);

    // Corrected general insight
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
      name: "Sales Index",
      description: "This is overall sales value index in Dubai.",
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
      name: "Sales Index",
      description: "This is overall sales value index in Dubai.",
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

export const SalesSimilarData = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("transaction", "last", params, token);

    // Will do the required calculation here and return the data to build graph
    const data = response.result;
    const chartcolumns = ["Date", "Sell Price", "Area (ft)"];
    let totalValue = 0;
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
      const date = new Date(item.dates.value);
      const formattedDate = `${date.getDate()}/${
        months[date.getMonth()]
      }/${date.getFullYear()}`;
      totalValue += item.value;
      return {
        Date: formattedDate, // Use the formatted date
        "Sell Price": item.value,
        "Area (ft)": item.price_per_sqft.toFixed(2),
      };
    });

    const avgValue = data[0].avg_value_per_year.toFixed(2);

    return {
      name: "Similar Transactions",
      chart_type: "table",
      chartConfig: {},
      filters: [],
      sub_metrics: [],
      view_more: true,
      otherInfo: [{ name: "Average Sales Value", value: avgValue }],
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
      additionalInfo: "N/A",
      columns: [],
      data: [], // Calculated data will be here
    };
  }
};

export const SalesPriceComparison = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("transaction", "comp", params, token);
    // Will do the required calculation here and return the data to build graph

    const data = response.result;
    const comparisonData = data.comparison.result;
    const priceChangeData = data.priceChange.result;
    console.log("compare data", data);
    const chartDataComp = comparisonData.map((item: any) => ({
      name: item.AREA_EN,
      avgPrice: item.avg_trans_value_current.toFixed(2),
      pricePerSqFt: item.avg_price_per_sqft_current.toFixed(2),
      transactions: item.num_sales_current.toFixed(2),
      avgPriceGrowth: item.growth_rate_avg_trans_value.toFixed(2),
      pricePerSqFtGrowth: item.growth_rate_avg_price_per_sqft.toFixed(2),
      transactionsGrowth: item.growth_rate_count_transactions.toFixed(2),
    }));
    const capitalizeFirstLetter = (str: string | undefined): string =>
      str
        ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        : "Unknown";

    const chartDataProp = priceChangeData.map((item: any) => ({
      name: `${capitalizeFirstLetter(
        item.IS_OFFPLAN_EN
      )} ${capitalizeFirstLetter(item.PROP_TYPE_EN)}`,
      avgPrice: (item.avg_current_price || 0).toFixed(2),
      pricePerSqFt: (item.avg_current_price_per_sqft || 0).toFixed(2),
      transactions: (item.total_current_count_transactions || 0).toFixed(2),
      avgPriceGrowth: (item.avg_price_growth || 0).toFixed(2),
      pricePerSqFtGrowth: (item.avg_price_per_sqft_growth || 0).toFixed(2),
      transactionsGrowth: (item.transaction_count_growth || 0).toFixed(2),
    }));

    return {
      name: "Price Comparison",
      chart_type: "comparison_table",
      filters: [
        { key: "area", label: "By Area", data: chartDataComp },
        {
          key: "property_type",
          label: "By Property Type",
          data: chartDataProp,
        },
      ],
      chartConfig: {},
      sub_metrics: [],
      view_more: true,
      data: chartDataComp, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating price comparison chart:", error);
    return {
      name: "Price Comparison",
      chart_type: "comparison_table",
      filters: [],
      chartConfig: {},
      sub_metrics: [],
      view_more: true,
      data: [], // Calculated data will be here
    };
  }
};

export const SalesSegmentation = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    params.start_year = Number(params?.end_year);
    const response = await ApiService("transaction", "types", params, token);
    // // Will do the required calculation here and return the data to build graph

    const data = response.result;
    console.log("data Transs", data);
    const commercialTotalData = data.filter(
      (item: any) => item?.USAGE_EN === "Commercial"
    );
    const residentialTotalData = data.filter(
      (item: any) => item?.USAGE_EN === "Residential"
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
      offplan_en: [
        { key: "ready", name: "Ready", color: colors.ready },
        { key: "offplan", name: "Offplan", color: colors.offplan },
      ],
      group_en: [
        { key: "total_sales", name: "Total Sales", color: "" },
        { key: "total_mortgage", name: "Total Mortgage", color: "" },
        { key: "total_gift", name: "Total Gift", color: "" },
      ],
      prop_type_en: [
        { key: "land", name: "Land", color: colors.land },
        { key: "unit", name: "Unit", color: colors.unit },
        { key: "building", name: "Building", color: colors.building },
        { key: "villa", name: "Villa", color: colors.villa },
      ],
      resale_vs_first_sale: [
        { key: "first_sale", name: "First Sale", color: colors.lease },
        { key: "resale", name: "Resale", color: colors.free_hold },
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
    if (residentialTotalData.length > 0) {
      allData["rooms_en"] = [
        {
          name: "Studio",
          value: residentialTotalData[0].types.rooms_en.count_studio,
          fill: colors.count_studio,
        },
        {
          name: "Single Room",
          value: residentialTotalData[0].types.rooms_en.count_single_room,
          fill: colors.count_single_room,
        },
        {
          name: "Penthouse",
          value: residentialTotalData[0].types.rooms_en.count_penthouse,
          fill: colors.count_penthouse,
        },
        {
          name: "1 B/R",
          value: residentialTotalData[0].types.rooms_en.count_1_B_R,
          fill: colors.count_1_B_R,
        },
        {
          name: "2 B/R",
          value: residentialTotalData[0].types.rooms_en.count_2_B_R,
          fill: colors.count_2_B_R,
        },
        {
          name: "3 B/R",
          value: residentialTotalData[0].types.rooms_en.count_3_B_R,
          fill: colors.count_3_B_R,
        },
        {
          name: "4 B/R",
          value: residentialTotalData[0].types.rooms_en.count_4_B_R,
          fill: colors.count_4_B_R,
        },
        {
          name: "5 B/R+",
          value:
            residentialTotalData[0].types.rooms_en.count_5_B_R +
            residentialTotalData[0].types.rooms_en.count_6_B_R +
            residentialTotalData[0].types.rooms_en.count_7_B_R +
            residentialTotalData[0].types.rooms_en.count_8_B_R +
            residentialTotalData[0].types.rooms_en.count_9_B_R,
          fill: colors.count_5_B_R,
        },
      ];

      residentialData["rooms_en"] = [
        {
          name: "Studio",
          value: residentialTotalData[0].types.rooms_en.count_studio,
          fill: colors.count_studio,
        },
        {
          name: "Single Room",
          value: residentialTotalData[0].types.rooms_en.count_single_room,
          fill: colors.count_single_room,
        },
        {
          name: "Penthouse",
          value: residentialTotalData[0].types.rooms_en.count_penthouse,
          fill: colors.count_penthouse,
        },
        {
          name: "1 B/R",
          value: residentialTotalData[0].types.rooms_en.count_1_B_R,
          fill: colors.count_1_B_R,
        },
        {
          name: "2 B/R",
          value: residentialTotalData[0].types.rooms_en.count_2_B_R,
          fill: colors.count_2_B_R,
        },
        {
          name: "3 B/R",
          value: residentialTotalData[0].types.rooms_en.count_3_B_R,
          fill: colors.count_3_B_R,
        },
        {
          name: "4 B/R",
          value: residentialTotalData[0].types.rooms_en.count_4_B_R,
          fill: colors.count_4_B_R,
        },
        {
          name: "5 B/R+",
          value:
            residentialTotalData[0].types.rooms_en.count_5_B_R +
            residentialTotalData[0].types.rooms_en.count_6_B_R +
            residentialTotalData[0].types.rooms_en.count_7_B_R +
            residentialTotalData[0].types.rooms_en.count_8_B_R +
            residentialTotalData[0].types.rooms_en.count_9_B_R,
          fill: colors.count_5_B_R,
        },
      ];
    }

    if (commercialTotalData.length > 0) {
      commercialData["rooms_en"] = [
        {
          name: "Industrial",
          value: commercialTotalData[0].types.prop_sb_type_en.count_industrial,
          fill: colors.count_studio,
        },
        {
          name: "Commercial",
          value: commercialTotalData[0].types.prop_sb_type_en.count_commercial,
          fill: colors.count_single_room,
        },
        {
          name: "Office",
          value: commercialTotalData[0].types.prop_sb_type_en.count_office,
          fill: colors.count_penthouse,
        },
        {
          name: "Shop",
          value: commercialTotalData[0].types.prop_sb_type_en.count_shop,
          fill: colors.count_1_B_R,
        },
        {
          name: "Show Rooms",
          value: commercialTotalData[0].types.prop_sb_type_en.count_show_rooms,
          fill: colors.count_2_B_R,
        },
        {
          name: "Gymnasium",
          value: commercialTotalData[0].types.prop_sb_type_en.count_gymnasium,
          fill: colors.count_3_B_R,
        },
        {
          name: "Sports Club",
          value: commercialTotalData[0].types.prop_sb_type_en.count_sports_club,
          fill: colors.count_4_B_R,
        },
      ];
    }

    const insights = `
      Residential transactions account for ${(
        (residentialTotalData[0]?.total_residential /
          (residentialTotalData[0]?.total_residential +
            commercialTotalData[0]?.total_commercial)) *
        100
      ).toFixed(2)}%, while commercial properties hold ${(
      (commercialTotalData[0]?.total_commercial /
        (residentialTotalData[0]?.total_residential +
          commercialTotalData[0]?.total_commercial)) *
      100
    ).toFixed(2)}%.
    `;

    const insightsaleVsReSale = `
        Resale properties account for ${(
          (allData.resale / (allData.resale + allData.first_sale)) *
          100
        ).toFixed(2)}% of total transactions.
        Off-plan sales are driving growth in first-sale transactions, up by 20%.
    `;

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
          insights: insightsaleVsReSale,
          data: allData?.free_hold_en, // Calculated data will be here
        },
        {
          key: "property_status",
          name: "Property Status",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            { key: "all", label: "All", data: allData.offplan_en },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.offplan_en,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.offplan_en,
            },
          ],

          data: allData?.offplan_en, // Calculated data will be here
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
          key: "resale_vs_first_sale",
          name: "Resale vs First Sale",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            { key: "all", label: "All", data: allData.resale_vs_first_sale },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.resale_vs_first_sale,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.resale_vs_first_sale,
            },
          ],
          data: allData?.resale_vs_first_sale, // Calculated data will be here
        },
        {
          key: "rooms",
          name: "Rooms",
          chart_type: "horizontal_bar",
          chartConfig: {},
          filters: [
            { key: "all", label: "All", data: allData.rooms_en },
            {
              key: "residential",
              label: "Residential",
              data: residentialData.rooms_en,
            },
            {
              key: "commercial",
              label: "Commercial",
              data: commercialData.rooms_en,
            },
          ],
          data: allData.rooms_en, // Calculated data will be here
        },
      ],
      insights: insights,
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
