import { BedroomChartDataTypeMonthly, BedroomChartDataTypeQuaterly, BedroomChartDataTypeYearly } from "@/components/bedrooms/bedrooms";
import { BedroomType } from "@/transcation/types";

export class Bedroom {
    getYearlyBedroomData({ data }: { data: BedroomType }): BedroomChartDataTypeYearly[] {
        const bedroomCount: { [bedrooms: string]: number } = {};
        const years = Object.keys(data).slice(-12); // Last 12 years of data
        for (const year of years) {
            const yearData = data[year];
            for (const month in yearData) {
                const monthData = yearData[month];
                for (const bedrooms in monthData) {
                    if (!bedroomCount[bedrooms]) {
                        bedroomCount[bedrooms] = 0;
                    }
                    bedroomCount[bedrooms] += monthData[bedrooms]?.property_count ?? 0;
                }
            }
        }
        return Object.keys(bedroomCount).map(bedrooms => ({
            bedrooms,
            property_count: bedroomCount[bedrooms]
        }));
    }

    getQuarterlyBedroomData({ data }: { data: BedroomType }): BedroomChartDataTypeQuaterly[] {
        const bedroomCount: { [bedrooms: string]: number } = {};
        const quarters = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthInt = parseInt(month);
                const quarter = `${year}-Q${Math.ceil(monthInt / 3)}`;
                acc[quarter] = acc[quarter] || {};
                Object.keys(yearData[month]).forEach(bedrooms => {
                    const propertyCount = yearData[month][bedrooms]?.property_count ?? 0;
                    acc[quarter][bedrooms] = (acc[quarter][bedrooms] || 0) + propertyCount;
                });
            }
            return acc;
        }, {} as { [quarter: string]: { [bedrooms: string]: number } });

        const last12Quarters = Object.keys(quarters).slice(-12);
        last12Quarters.forEach(quarter => {
            const quarterData = quarters[quarter];
            Object.keys(quarterData).forEach(bedrooms => {
                bedroomCount[bedrooms] = (bedroomCount[bedrooms] || 0) + quarterData[bedrooms];
            });
        });

        return Object.keys(bedroomCount).map(bedrooms => ({
            bedrooms,
            property_count: bedroomCount[bedrooms]
        }));
    }

    getMonthlyBedroomData({ data }: { data: BedroomType }): BedroomChartDataTypeMonthly[] {
        const bedroomCount: { [bedrooms: string]: number } = {};
        const months = Object.keys(data).reduce((acc, year) => {
            const yearData = data[year];
            for (const month in yearData) {
                const monthKey = `${year}-${month}`;
                acc[monthKey] = yearData[month];
            }
            return acc;
        }, {} as { [month: string]: any });

        const last12Months = Object.keys(months).slice(-12);
        last12Months.forEach(month => {
            const monthData = months[month];
            for (const bedrooms in monthData) {
                bedroomCount[bedrooms] = (bedroomCount[bedrooms] || 0) + monthData[bedrooms]?.property_count ?? 0;
            }
        });

        return Object.keys(bedroomCount).map(bedrooms => ({
            bedrooms,
            property_count: bedroomCount[bedrooms]
        }));
    }
}
