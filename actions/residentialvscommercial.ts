import {
  RandCChartDataTypeMonthly,
  RandCChartDataTypeQuaterly,
  RandCChartDataTypeYearly,
} from "@/components/insights/ResidentialVsCommercial/ResidentialVsCommercial";
import { ResidentialVsCommercialType } from "@/transcation/types";

export class ResvsCo {
  getYearlyData({
    data,
  }: {
    data: ResidentialVsCommercialType;
  }): RandCChartDataTypeYearly {
    if (!data) {
      return {
        Residential: 0,
        Commercial: 0,
      };
    }
    const result = {
      Residential: 0,
      Commercial: 0,
    };
    const years = Object.keys(data).slice(-12); // Last 12 years of data
    for (const year of years) {
      const yearData = data[year];
      for (const month in yearData) {
        const monthData = yearData[month];
        for (const usage in monthData) {
          const propertyCount = monthData[usage]?.property_count ?? 0;
          if (usage === "Residential") {
            result.Residential += propertyCount;
          } else if (usage === "Commercial") {
            result.Commercial += propertyCount;
          }
        }
      }
    }
    return result;
  }

  getQuarterlyData({
    data,
  }: {
    data: ResidentialVsCommercialType;
  }): RandCChartDataTypeQuaterly {
    const result = {
      Residential: 0,
      Commercial: 0,
    };
    const quarters = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthInt = parseInt(month);
        const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
        acc[quarter] = acc[quarter] || { Residential: 0, Commercial: 0 };
        const monthData = yearData[month];
        for (const usage in monthData) {
          const propertyCount = monthData[usage]?.property_count ?? 0;
          if (usage === "Residential") {
            acc[quarter].Residential += propertyCount;
          } else if (usage === "Commercial") {
            acc[quarter].Commercial += propertyCount;
          }
        }
      }
      return acc;
    }, {} as { [quarter: string]: RandCChartDataTypeQuaterly });

    const last12Quarters = Object.keys(quarters).slice(-12);
    last12Quarters.forEach((quarter) => {
      result.Residential += quarters[quarter].Residential;
      result.Commercial += quarters[quarter].Commercial;
    });

    return result;
  }

  getMonthlyData({
    data,
  }: {
    data: ResidentialVsCommercialType;
  }): RandCChartDataTypeMonthly {
    const result = {
      Residential: 0,
      Commercial: 0,
    };
    const months = Object.keys(data).reduce((acc, year) => {
      const yearData = data[year];
      for (const month in yearData) {
        const monthKey = `${year}-${month}`;
        acc[monthKey] = { Residential: 0, Commercial: 0 };
        const monthData = yearData[month];
        for (const usage in monthData) {
          const propertyCount = monthData[usage]?.property_count ?? 0;
          if (usage === "Residential") {
            acc[monthKey].Residential += propertyCount;
          } else if (usage === "Commercial") {
            acc[monthKey].Commercial += propertyCount;
          }
        }
      }
      return acc;
    }, {} as { [month: string]: RandCChartDataTypeMonthly });

    const last12Months = Object.keys(months).slice(-12);
    last12Months.forEach((month) => {
      result.Residential += months[month].Residential;
      result.Commercial += months[month].Commercial;
    });

    return result;
  }
}
