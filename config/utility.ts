import axios from "axios";
import { ChartDescription } from "./types";

export const CalculateMatrix = async (
  url: string,
  type: string,
  params?: {
    [key: string]: string | number;
  }
) => {
  try {
    const response = await axios.get(url, { params: params });

    console.log("response", response.data);
    const transactions = response.data.data.data;

    if (transactions.length === 0) {
      throw new Error("No transactions found for the specified filters.");
    }
    console.log(transactions);
    const growthCalculator = (current: number, previous: number) =>
      ((current - previous) / previous) * 100;

    if (type === "sales") {
      const avgSalesValue = transactions[1].average_value_of_transactions;
      const avgSalesValueGrowth = growthCalculator(
        parseFloat(avgSalesValue),
        parseFloat(transactions[0].average_value_of_transactions)
      );
      const avgPricePerSqft = transactions[1].average_Price_per_sqft;
      const salesPerSqftGrowth = growthCalculator(
        parseFloat(avgPricePerSqft),
        parseFloat(transactions[0].average_Price_per_sqft)
      );
      const totalValue = transactions[1].Total_Value_of_Transaction;
      const totalValueGrowth = growthCalculator(
        parseFloat(totalValue),
        parseFloat(transactions[0].Total_Value_of_Transaction)
      );
      const noOfTransactions = transactions[1].number_of_Row_Used;
      const noOfTransactionsGrowth = growthCalculator(
        parseFloat(noOfTransactions),
        parseFloat(transactions[0].number_of_Row_Used)
      );

      return [
        {
          key: "avg_sales_value",
          title: "Average Sales Value",
          value: avgSalesValue.toFixed(2),
          growth: avgSalesValueGrowth.toFixed(2),
        },
        {
          key: "avg_price_per_sqft",
          title: "Avg. Price per SQFT",
          value: avgPricePerSqft.toFixed(2),
          growth: salesPerSqftGrowth.toFixed(2),
        },
        {
          key: "total_value",
          title: "Total Value",
          value: totalValue.toFixed(2),
          growth: totalValueGrowth.toFixed(2),
        },
        {
          key: "no_of_transactions",
          title: "No of Transactions",
          value: noOfTransactions,
          growth: noOfTransactionsGrowth.toFixed(2),
        },
      ];
    } else {
      const avgRentNew = transactions[1].avg_rent_new_yearly;
      const avgRentNewGrowth = growthCalculator(
        parseFloat(avgRentNew),
        parseFloat(transactions[0].avg_rent_new_yearly)
      );
      const avgRentRenewal = transactions[1].avg_rent_renewal_yearly;
      const avgRentRenewalGrowth = growthCalculator(
        parseFloat(avgRentRenewal),
        parseFloat(transactions[0].avg_rent_renewal_yearly)
      );
      const totalTransaction = transactions[1].total_transaction_yearly;
      const totalTransactionGrowth = growthCalculator(
        parseFloat(totalTransaction),
        parseFloat(transactions[0].total_transaction_yearly)
      );
      const renewalRatio = transactions[1].renewal_ratio_yearly;
      const renewalRatioGrowth = growthCalculator(
        parseFloat(renewalRatio),
        parseFloat(transactions[0].renewal_ratio_yearly)
      );
      console.log(avgRentNewGrowth, avgRentRenewalGrowth);
      return [
        {
          key: "avg_rent_new",
          title: "Average Rent (New)",
          value: avgRentNew.toFixed(2),
          growth: avgRentNewGrowth.toFixed(2),
        },
        {
          key: "sales_per_sqft",
          title: "Average Rent (Renewal)",
          value: avgRentRenewal.toFixed(2),
          growth: avgRentRenewalGrowth.toFixed(2),
        },
        {
          key: "total_transactions",
          title: "Total Transactions",
          value: totalTransaction,
          growth: totalTransactionGrowth.toFixed(2),
        },
        {
          key: "renewal_ratio",
          title: "Renewal Ratio",
          value: String((renewalRatio * 100).toFixed(2)) + "%",
          growth: renewalRatioGrowth.toFixed(2),
        },
      ];
    }
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return [
      {
        key: "avg_sales_value",
        title: "Average Sales Value",
        value: "N/A",
      },
      {
        key: "sales_per_sqft",
        title: "Sales Per Sqft",
        value: "N/A",
      },
      {
        key: "total_value",
        title: "Total Value",
        value: "N/A",
      },
      {
        key: "no_of_transactions",
        title: "No of Transactions",
        value: "N/A",
      },
    ];
  }
};

export const CalculateCharts = async (
  type: "sales" | "rental",
  params?: {
    [key: string]: string | number;
  }
) => {
  const allCharts: ChartDescription[] = [];

  if (type === "sales") {
    const charts = await Promise.all([
      SalesTypeChart(params),
      SalesValueTrend(params),
      SalesTrend(params),
      SalesIndex(params),
      SalesSimilarData(params),
      SalesPriceComparison(params),
      SalesSegmentation(params),
    ]);

    allCharts.push(...charts);
  } else {
    const charts = await Promise.all([
      RentalValueTrend(params),
      RentalTrend(params),
      RentalIndex(params),
      RentalSimilarData(params),
      RentalComparison(params),
      RentalSegmentation(params),
    ]);

    allCharts.push(...charts);
  }

  return allCharts;
};

export const SalesTypeChart = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/types`,
      {
        params: params,
      }
    );
    // Will do the required calculation here and return the data to build graph
    const data = response.data.data.data;
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
      insights:
        "Cash transactions dominate Dubai’s market, attracting global investors, while mortgages contribute a growing 10%.",
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

export const SalesValueTrend = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const date = new Date();
    const end_year = date.getFullYear();
    const start_year = end_year - 9;
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${start_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
    console.log("response barrr", response.data);
    const data = response.data.data.data;
    console.log("data Transs", data);

    const totalValue = data.map((item: any) => ({
      year: item.Year,
      value: item.Total_Value_of_Transaction.toFixed(2),
    }));

    const pricePerSqft = data.map((item: any) => ({
      year: item.Year,
      value: item.average_Price_per_sqft.toFixed(2),
    }));
    console.log("totalValue", totalValue);
    // Will do the required calculation here and return the data to build graph
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
      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: totalValue, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating transactions value trend chart:", error);
    return {
      name: "Transactions Value Trend",
      description:
        "Compare transactional total value and value per sqft over time.",
      filters: ["Total Value", "Value per SQFT"],
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

export const SalesTrend = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const date = new Date();
    const end_year = date.getFullYear();
    const start_year = end_year - 9;
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends?start_year=${start_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
    const data = response.data.data.data;
    console.log("chddd", data);

    // Process yearly data
    const yearlyData = data.map((item: any) => ({
      year: item.Year,
      value1: item.number_of_Row_Used,
    }));

    // Process monthly data for the current year
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
    const currentYearData = data[data.length - 1];
    const monthlyData = currentYearData.month_data.map((item: any) => ({
      year: months[parseInt(item.Month) - 1],
      value1: item.number_of_Row_Used,
    }));

    // Ensure monthly data has 12 months (by adding data from the previous year if necessary)
    let i = 11;
    while (monthlyData.length !== 12) {
      const prevYearData = data[data.length - 2];
      monthlyData.unshift({
        year: `${months[parseInt(prevYearData.month_data[i].Month) - 1]}_${
          prevYearData.Year
        }`,
        value1: prevYearData.month_data[i].number_of_Row_Used,
      });
      i--;
    }

    // Process quarterly data for the last 3 years
    const quarterlyData = [];
    for (let j = data.length - 3; j < data.length; j++) {
      const yearData = data[j].month_data;
      for (let q = 0; q < 4; q++) {
        const startMonth = q * 3;
        const endMonth = startMonth + 3;
        const quarterMonths = yearData.slice(startMonth, endMonth);

        const quarterValue = quarterMonths.reduce(
          (sum: number, item: any) => sum + item.number_of_Row_Used,
          0
        );

        quarterlyData.push({
          year: `Q${q + 1} ${data[j].Year}`,
          value1: quarterValue,
        });
      }
    }

    console.log(yearlyData, monthlyData, quarterlyData);
    // Will do the required calculation here and return the data to build graph
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
      insights:
        "This type of properties has high demand in this area and demand is 10% higher than the overall Dubai overage. ",
      data: monthlyData, // Calculated data will be here
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

export const SalesIndex = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/index`,
      {
        params: params,
      }
    );
    const date = new Date();
    const end_year = date.getFullYear();
    const responseRange = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/salesIndex?start_year=${end_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );

    // Will do the required calculation here and return the data to build graph
    const data = response.data.data.quartiles;
    console.log("percentile25", data);
    const percentile25 = data[0].max;
    const percentile75 = data[3].min;

    const rangeData = responseRange.data.data.data[0];
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
          data: chartData, // Calculated data will be here
        },
      ],
      insights:
        "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
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

export const SalesSimilarData = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/last`,
      { params: params }
    );

    // Will do the required calculation here and return the data to build graph
    const data = response.data.data.data;
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

export const SalesPriceComparison = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/comp?location=Business%20Bay`,
      {
        params: params,
      }
    );
    // Will do the required calculation here and return the data to build graph

    const data = response.data.data.data;
    console.log("compare data", data);
    const chartData = data.map((item: any) => ({
      name: item.AREA_EN,
      avgPrice: item.avg_trans_value.toFixed(2),
      pricePerSqFt: item.avg_price_per_sqft.toFixed(2),
      transactions: item.num_sales.toFixed(2),
    }));

    return {
      name: "Price Comparison",
      chart_type: "comparison_table",
      filters: [],
      chartConfig: {},
      sub_metrics: [],
      view_more: true,
      data: chartData, // Calculated data will be here
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

export const SalesSegmentation = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/types`,
      {
        params: params,
      }
    );
    // // Will do the required calculation here and return the data to build graph

    const data = response.data.data.data;
    console.log("data Transs", data);
    const commercialTotalData = data.filter(
      (item: any) => item.USAGE_EN === "Commercial"
    );
    const residentialTotalData = data.filter(
      (item: any) => item.USAGE_EN === "Residential"
    );
    console.log("commercialTotalData", commercialTotalData);
    const chartData = [
      {
        name: "Commercial",
        value: commercialTotalData[0].total_commercial,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: "Residential",
        value: residentialTotalData[0].total_residential,
        colorClass: "bg-[#EFEEFC]",
      },
    ];
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
    };

    const calculateCategoryData = (sourceData: any[], categoryKey: string) => {
      return categories[categoryKey].map(({ key, name, color }) => {
        const value = sourceData.reduce((sum: number, item: any) => {
          const commercialValue =
            item.total_commercial > 0 ? item.types[categoryKey]?.[key] || 0 : 0;
          const residentialValue =
            item.total_residential > 0
              ? item.types[categoryKey]?.[key] || 0
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
          data: allData?.free_hold_en, // Calculated data will be here
          insights:
            "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
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

export const RentalValueTrend = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    // Will do the required calculation here and return the data to build graph
    params = {};
    const date = new Date();
    const end_year = date.getFullYear();
    const start_year = end_year - 9;
    console.log("params", params);
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/average?start_year${start_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
    console.log("response barrr", response.data);
    const data = response.data.data.data;
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
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      },
      sub_charts: [],
      insights:
        "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
      data: avgRents, // Calculated data will be here
    };
  } catch (error) {
    console.error("Error calculating transactions value trend chart:", error);
    return {
      name: "Transactions Value Trend",
      description:
        "Compare transactional total value and value per sqft over time.",
      filters: ["Total Value", "Value per SQFT"],
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

export const RentalTrend = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const date = new Date();
    const currentMonth = date.getMonth();
    const end_year = date.getFullYear();
    const start_year = end_year - 1;
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/average?start_year=${start_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
    const data = response.data.data.data;
    console.log("chddd", data);

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
          year: `${months[currentMonth + i]}_${end_year - 1}`,
          value1: previousYearData[currentMonth + i].Total_Transactions,
        });
        newData.push({
          year: `${months[currentMonth + i]}_${end_year - 1}`,
          value1: previousYearData[currentMonth + i].Total_Transactions_New,
        });
        renewData.push({
          year: `${months[currentMonth + i]}_${end_year - 1}`,
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
        desktop: {
          label: "Desktop",
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

export const RentalIndex = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/index`,
      {
        params: params,
      }
    );
    const date = new Date();
    const end_year = date.getFullYear();
    const responseRange = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/rentIndex?start_year=${end_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );

    // Will do the required calculation here and return the data to build graph
    const data = response.data.data.quartiles;
    console.log("percentile25", data);
    const percentile25 = data[0].max;
    const percentile75 = data[3].min;

    const rangeData = responseRange.data.data.data[0];
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
            "<25K": { color: "#FFDBDB" },
            "25K to 50k": { color: "#EFEEFC" },
            "50k to 100k": { color: "#DDF8E4" },
            "100k to 200k": { color: "#FCF8D1" },
            "200k to 400k": { color: "#FFC8C8" },
            ">400k": { color: "#FFC8C8" },
          },
          data: chartData, // Calculated data will be here
        },
      ],
      insights:
        "Above chart indicates that most properties sold in Dubai ranges between 2.4 Million to 5.6 Million. Average price: 750000. ",
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

export const RentalSimilarData = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/last`,
      { params: params }
    );

    // Will do the required calculation here and return the data to build graph
    const data = response.data.data.data;
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

export const RentalComparison = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const date = new Date();
    const end_year = date.getFullYear();
    const start_year = end_year - 1;
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/comp?start_year=${end_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
    // Will do the required calculation here and return the data to build graph

    const data = response.data.data.data;
    console.log("compare data", data);
    const chartData = data.map((item: any) => ({
      name: item.AREA_EN,
      avgPrice: item.avg_rent_value.toFixed(2),
      pricePerSqFt: String(item.renewal_ratio.toFixed(2) * 100) + "%",
      transactions: item.num_rents.toFixed(2),
    }));

    return {
      name: "Rent Comparison",
      chart_type: "comparison_table",
      filters: [],
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

export const RentalSegmentation = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    const date = new Date();
    const end_year = date.getFullYear();
    params = {};
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/rental/segment?start_year=${end_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
    // // Will do the required calculation here and return the data to build graph

    const data = response.data.data.data;
    console.log("data Transs", response);
    const commercialTotalData = data.filter(
      (item: any) => item.USAGE_EN === "Commercial"
    );
    const residentialTotalData = data.filter(
      (item: any) => item.USAGE_EN === "Residential"
    );
    console.log("commercialTotalData", commercialTotalData);
    const chartData = [
      {
        name: "Commercial",
        value: commercialTotalData[0].total_commercial,
        colorClass: "bg-[#FFC8C8]",
      },
      {
        name: "Residential",
        value: residentialTotalData[0].total_residential,
        colorClass: "bg-[#EFEEFC]",
      },
    ];
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
            item.total_commercial > 0 ? item.types[categoryKey]?.[key] || 0 : 0;
          const residentialValue =
            item.total_residential > 0
              ? item.types[categoryKey]?.[key] || 0
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
          insights:
            "Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum morbi eu elit. Neque Average price: 750000. ",
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
