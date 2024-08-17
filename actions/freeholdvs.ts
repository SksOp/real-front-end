import { FrvReChartDataTypeMonthly, FrvReChartDataTypeQuaterly, FrvReChartDataTypeYearly } from "@/components/FreeholdvsLease/FreeholdvsLease";
import { FreeholdVsLeaseType } from "@/transcation/types";

export class FrVsRe {
    getYearlyData({ data }: { data: FreeholdVsLeaseType }): FrvReChartDataTypeYearly {
        const result = {
            Freehold: 0,
            Lease: 0
        };
        const years = Object.keys(data).slice(-12); // Last 12 years of data
        for (const year of years) {
            const yearData = data[year];
            for (const month in yearData) {
                const monthData = yearData[month];
                for (const tenure in monthData) {
                    const count = monthData[tenure] ?? 0;
                    if (tenure === "1") {
                        result.Freehold += count;
                    } else if (tenure === "0") {
                        result.Lease += count;
                    }
                }
            }
        }
        return result;
    }

    getQuarterlyData({ data }: { data: FreeholdVsLeaseType }): FrvReChartDataTypeQuaterly {
        const result = {
            Freehold: 0,
            Lease: 0
        };
        const quarters = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthInt = parseInt(month);
                const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
                acc[quarter] = acc[quarter] || { Freehold: 0, Lease: 0 };
                const monthData = yearData[month];
                for (const tenure in monthData) {
                    const count = monthData[tenure] ?? 0;
                    if (tenure === "1") {
                        acc[quarter].Freehold += count;
                    } else if (tenure === "0") {
                        acc[quarter].Lease += count;
                    }
                }
            }
            return acc;
        }, {} as { [quarter: string]: FrvReChartDataTypeQuaterly });

        const last12Quarters = Object.keys(quarters).slice(-12);
        last12Quarters.forEach(quarter => {
            result.Freehold += quarters[quarter].Freehold;
            result.Lease += quarters[quarter].Lease;
        });

        return result;
    }

    getMonthlyData({ data }: { data: FreeholdVsLeaseType }): FrvReChartDataTypeMonthly {
        const result = {
            Freehold: 0,
            Lease: 0
        };
        const months = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthKey = `${year}-${month}`;
                acc[monthKey] = { Freehold: 0, Lease: 0 };
                const monthData = yearData[month];
                for (const tenure in monthData) {
                    const count = monthData[tenure] ?? 0;
                    if (tenure === "1") {
                        acc[monthKey].Freehold += count;
                    } else if (tenure === "0") {
                        acc[monthKey].Lease += count;
                    }
                }
            }
            return acc;
        }, {} as { [month: string]: FrvReChartDataTypeMonthly });

        const last12Months = Object.keys(months).slice(-12);
        last12Months.forEach(month => {
            result.Freehold += months[month].Freehold;
            result.Lease += months[month].Lease;
        });

        return result;
    }
}
