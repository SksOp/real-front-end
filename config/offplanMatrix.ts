import ApiService from "@/utils/apiService";

const growthCalculator = (current: number, previous: number | null) => {
  if (previous === null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

export const CalculateOffplanMatrix = async (
  params: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  try {
    const response = await ApiService("transaction", "offplan", params, token);

    const data = response.result[0];

    const avg_value_unit = data.avg_worth_offplan_unit.toFixed(2);
    const avg_value_villa = data.avg_worth_offplan_villa.toFixed(2);
    const avg_price_per_sqft_villa =
      data.avg_price_per_sqft_offplan_villa.toFixed(2);
    const avg_price_per_sqft_unit =
      data.avg_price_per_sqft_offplan_unit.toFixed(2);
    const avg_price_overall = data.total_worth_offplan.toFixed(2);
    const avg_price_per_sqft_overall =
      data.avg_price_per_sqft_offplan.toFixed(2);
    return [
      {
        key: "avg_value_unit",
        title: "Average Value (Unit)",
        value: avg_value_unit,
      },
      {
        key: "avg_value_villa",
        title: "Average Value (Villa)",
        value: avg_value_villa,
      },
      {
        key: "avg_price_per_sqft_villa",
        title: "Average Price per SQFT (Villa)",
        value: avg_price_per_sqft_villa,
      },
      {
        key: "avg_price_per_sqft_unit",
        title: "Average Price per SQFT (Unit)",
        value: avg_price_per_sqft_unit,
      },
      {
        key: "avg_price_overall",
        title: "Average Price (Overall)",
        value: avg_price_overall,
      },
      {
        key: "avg_price_per_sqft_overall",
        title: "Average Price per SQFT (Overall)",
        value: avg_price_per_sqft_overall,
      },
    ];
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return [
      {
        key: "avg_value_unit",
        title: "Average Value (Unit)",
        value: "N/A",
      },
      {
        key: "avg_value_villa",
        title: "Average Value (Villa)",
        value: "N/A",
      },
      {
        key: "avg_price_per_sqft_villa",
        title: "Average Price per SQFT (Villa)",
        value: "N/A",
      },
      {
        key: "avg_price_per_sqft_unit",
        title: "Average Price per SQFT (Unit)",
        value: "N/A",
      },
      {
        key: "avg_price_overall",
        title: "Average Price (Overall)",
        value: "N/A",
      },
      {
        key: "avg_price_per_sqft_overall",
        title: "Average Price per SQFT (Overall)",
        value: "N/A",
      },
    ];
  }
};
