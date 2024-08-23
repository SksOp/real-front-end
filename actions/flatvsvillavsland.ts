import { RecieveDataType } from "@/transcation/types";

export class RealEstateData {
  getYearlyData(data: RecieveDataType[]) {
    const currentYear = new Date().getFullYear();
    const filteredData = data.filter((d) => d.year >= currentYear - 12);
    return this.aggregateData(filteredData);
  }

  getQuarterlyData(data: RecieveDataType[]) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const filteredData = data.filter((d) => {
      const monthDifference =
        (currentYear - d.year) * 12 + (currentMonth - d.month);
      return monthDifference <= 36; // Last 12 quarters
    });
    return this.aggregateData(filteredData);
  }

  getMonthlyData(data: RecieveDataType[]) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const filteredData = data.filter((d) => {
      const monthDifference =
        (currentYear - d.year) * 12 + (currentMonth - d.month);
      return monthDifference <= 12; // Last 12 months
    });
    return this.aggregateData(filteredData);
  }

  private aggregateData(data: RecieveDataType[]) {
    const result = {
      sales: data.reduce((total, record) => total + record.sales, 0),
      transaction: data.reduce(
        (total, record) => total + record.transaction,
        0
      ),
    };
    return result;
  }
}
