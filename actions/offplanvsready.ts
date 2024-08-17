import { OffplanvsReady, OfReChartDataTypeMonthly, OfReChartDataTypeQuaterly, OfReChartDataTypeYearly } from "@/components/OffplanvsReady/OffplanvsReady";
import {  OffplanvsReadyType } from "@/transcation/types";

export class OfVsRe {
    getYearlyData({ data }: { data: OffplanvsReadyType }): OfReChartDataTypeYearly {
        if(!data) return { Ofplan: 0, Ready: 0 };
        const result = {
            Ofplan: 0,
            Ready: 0
        };
        const years = Object.keys(data).slice(-12); // Last 12 years of data
        for (const year of years) {
            const yearData = data[year];
            for (const month in yearData) {
                const monthData = yearData[month];
                for (const status in monthData) {
                    const count = monthData[status] ?? 0;
                    if (status === "1") {
                        result.Ofplan += count;
                    } else if (status === "0") {
                        result.Ready += count;
                    }
                }
            }
        }
        return result;
    }

    getQuarterlyData({ data }: { data: OffplanvsReadyType }): OfReChartDataTypeQuaterly {
        if(!data) return { Ofplan: 0, Ready: 0 };
        const result = {
            Ofplan: 0,
            Ready: 0
        };
        const quarters = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthInt = parseInt(month);
                const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
                acc[quarter] = acc[quarter] || { Ofplan: 0, Ready: 0 };
                const monthData = yearData[month];
                for (const status in monthData) {
                    const count = monthData[status] ?? 0;
                    if (status === "1") {
                        acc[quarter].Ofplan += count;
                    } else if (status === "0") {
                        acc[quarter].Ready += count;
                    }
                }
            }
            return acc;
        }, {} as { [quarter: string]: OfReChartDataTypeQuaterly });

        const last12Quarters = Object.keys(quarters).slice(-12);
        last12Quarters.forEach(quarter => {
            result.Ofplan += quarters[quarter].Ofplan;
            result.Ready += quarters[quarter].Ready;
        });

        return result;
    }

    getMonthlyData({ data }: { data: OffplanvsReadyType }): OfReChartDataTypeMonthly {
        if(!data) return { Ofplan: 0, Ready: 0 };
        const result = {
            Ofplan: 0,
            Ready: 0
        };
        const months = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthKey = `${year}-${month}`;
                acc[monthKey] = { Ofplan: 0, Ready: 0 };
                const monthData = yearData[month];
                for (const status in monthData) {
                    const count = monthData[status] ?? 0;
                    if (status === "1") {
                        acc[monthKey].Ofplan += count;
                    } else if (status === "0") {
                        acc[monthKey].Ready += count;
                    }
                }
            }
            return acc;
        }, {} as { [month: string]: OfReChartDataTypeMonthly });

        const last12Months = Object.keys(months).slice(-12);
        last12Months.forEach(month => {
            result.Ofplan += months[month].Ofplan;
            result.Ready += months[month].Ready;
        });

        return result;
    }
}
