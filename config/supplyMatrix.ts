import ApiService from "@/utils/apiService";

const growthCalculator = (current: number, previous: number | null) => {
  if (previous === null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

export const CalculateSupplyMatrix = async (
  params?: {
    [key: string]: string | number;
  },
  token?: string | null
) => {
  console.log(params);
  try {
    const response = await ApiService("projects", "details", params, token);

    const transactions = response.result[0];

    const response2 = await ApiService("developers", "total", params, token);
    const data = response2.result[0].developer_count;
    console.log(data);
    if (transactions.length === 0) {
      throw new Error("No transactions found for the specified filters.");
    }
    console.log(transactions);
    const number_of_projects_overall = transactions.total_projects_overall;
    const number_of_projects_supply =
      transactions.total_projects_new_supply_overall;
    const number_of_villas = transactions.total_villas_overall;
    const number_of_apartments = transactions.total_apartments_overall;
    const total_units =
      transactions.total_units_overall + transactions.total_villas_overall;
    const properties_completion_rate =
      transactions.breakdown[transactions.breakdown.length - 1]
        ?.completed_projects /
      transactions.breakdown[transactions.breakdown.length - 1]?.total_projects;

    return [
      {
        key: "number_of_projects_overall",
        title: "Number of Projects (Overall)",
        value: number_of_projects_overall,
      },
      {
        key: "number_of_projects_supply",
        title: "Number of Projects (Supply)",
        value: number_of_projects_supply,
      },
      {
        key: "number_of_villas",
        title: "Number of Villas",
        value: number_of_villas,
      },
      {
        key: "number_of_apartments",
        title: "Number of Apartments",
        value: number_of_apartments,
      },
      {
        key: "total_units",
        title: "Total Units",
        value: total_units,
      },
      {
        key: "properties_completion_rate",
        title: "Properties Completion Rate",
        value: String((properties_completion_rate * 100).toFixed(2)) + "%",
      },
      { key: "total_developers", title: "Total Developers", value: data },
    ];
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return [
      {
        key: "number_of_projects_overall",
        title: "Number of Projects (Overall)",
        value: "N/A",
      },
      {
        key: "number_of_projects_supply",
        title: "Number of Projects (Supply)",
        value: "N/A",
      },
      {
        key: "number_of_villas",
        title: "Number of Villas",
        value: "N/A",
      },
      {
        key: "number_of_apartments",
        title: "Number of Apartments",
        value: "N/A",
      },
    ];
  }
};
