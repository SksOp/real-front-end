import { OffplanvsReady, OfReChartDataTypeMonthly, OfReChartDataTypeQuaterly, OfReChartDataTypeYearly } from "@/components/OffplanvsReady/OffplanvsReady";
import {  OffplanvsReadyType } from "@/transcation/types";

export class OfVsRe {
    getYearlyData({ data }: { data: OffplanvsReadyType }): OfReChartDataTypeYearly {
        const result = {
            Ofplan: 0,
            Ready: 0
        };
        const years = Object.keys(data).slice(-12); // Last 12 years of data
        for (const year of years) {
            const yearData = data[year];
            for (const month in yearData) {
                const monthData = yearData[month];
                for (const tenure in monthData) {
                    const count = monthData[tenure] ?? 0;
                    if (tenure === 'Ofplan') {
                        result.Ofplan += count;
                    } else if (tenure === 'Ready') {
                        result.Ready += count;
                    }
                }
            }
        }
        return result;
    }

    getQuarterlyData({ data }: { data: OffplanvsReadyType }): OfReChartDataTypeQuaterly {
        const result = {
            Ofplan: 0,
            Ready: 0
        };
        const quarters = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthInt = parseInt(month);
                const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
                acc[quarter] = acc[quarter] || { OffplanvsReady: 0, Ready: 0 };
                const monthData = yearData[month];
                for (const tenure in monthData) {
                    const count = monthData[tenure] ?? 0;
                    if (tenure === 'Ofplan') {
                        acc[quarter].Ofplan += count;
                    } else if (tenure === 'Ready') {
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
                for (const tenure in monthData) {
                    const count = monthData[tenure] ?? 0;
                    if (tenure === 'OffplanvsReady') {
                        acc[monthKey].Ofplan += count;
                    } else if (tenure === 'Ready') {
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
