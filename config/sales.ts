import axios from "axios";

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

export const SalesValueTrend = async (params: {
  [key: string]: string | number;
}) => {
  try {
    params.start_year = Number(params?.end_year) - 9;
    const response = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/trends`,
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

    const insight = `
          Dubai’s GMV grew by 18% this year, reaching new highs in luxury transactions.
          Off-plan properties show the fastest growth in transaction value.
          The total market value crossed AED 350B, up from AED 295B last year.
      `;

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
    params = {};
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

export const SalesPriceRanges = async (params?: {
  [key: string]: string | number;
}) => {
  try {
    params = {};
    const date = new Date();
    const end_year = date.getFullYear();
    const responseRange = await axios.get(
      `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transaction/salesIndex?start_year=${end_year}&end_year=${end_year}`,
      {
        params: params,
      }
    );
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

    // Will do the required calculation here and return the data to build graph
    const data = response.data.data.quartiles;
    console.log("percentile25", data);
    const percentile25 = data[0].max;
    const percentile75 = data[3].min;
    const priceRangeData = await SalesPriceRanges(params);
    return {
      name: "Sales Index",
      description: "This is overall sales value index in Dubai.",
      chart_type: "percentile_bar",
      filters: [],
      chartConfig: {},
      sub_charts: [priceRangeData],
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
      resale_vs_first_sale: [
        { key: "first_sale", name: "First Sale", color: colors.lease },
        { key: "resale", name: "Resale", color: colors.free_hold },
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
