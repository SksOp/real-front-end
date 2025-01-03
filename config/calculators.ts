import axios from "axios";
import { Calculator } from "./types";
import { FormatValue } from "@/utils/formatNumbers";
import { BASE_URL } from "./constant";

export const Calculators: Calculator[] = [
  {
    key: "sales_value_estimator",
    name: "Sales Value Estimator",
    description:
      "Estimate current property sales value based on market trends and attributes.",
    inputs: [
      {
        key: "property_selection",
        label: "Property Selector",
        type: "property_selector",
        is_mandatory: false,
      },
      {
        key: "usage_type",
        label: "Usage Type",
        type: "radio",
        options: ["Residential", "Commercial"],
        is_mandatory: true,
      },
      {
        key: "sale_type",
        label: "Sale Type",
        type: "radio",
        options: ["First Sale", "Resale"],
        is_mandatory: true,
      },
      {
        key: "choose_location",
        label: "Choose Location",
        type: "dropdown",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
        options: [],
        //all the unique area_en from transactions should be listed here;

        placeholder: "select area",
        searchable: true,
        is_mandatory: true,
      },
      // {
      //   key: "select_developer",
      //   label: "Select Developer",
      //   type: "dropdown",
      //   options: ["A", "B", "C", "D"],
      //   //all the unique developers from transactions should be listed here;
      //   source:
      //     "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=developer_en",
      //   placeholder: "select developer",
      //   searchable: true,
      //   is_mandatory: false,
      // },
      {
        key: "choose_project",
        label: "Choose Project",
        type: "dropdown",
        options: [
          "BLUE BAY",
          "SILICON GATE 3",
          "CLAREN 2",
          "AZURE RESIDENCE",
          "Azizi. Liatris",
        ],
        //all the unique projects from transactions should be listed here;

        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=project_en",
        placeholder: "select project",
        searchable: true,
        is_mandatory: false,
      },
      {
        key: "property_type",
        label: "Property Type",
        type: "dropdown",
        options: ["Villa", "Unit", "Building", "Land"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_type",
        placeholder: "select type",
        is_mandatory: true,
      },
      {
        key: "property_area",
        label: "Property Area (SQFT)",
        type: "value",
        placeholder: "enter property area in sqft",
        is_mandatory: true,
      },
      {
        key: "no_of_bedrooms",
        label: "No. of Bedrooms",
        type: "dropdown",
        options: [1, 2, 3, 4, 5, "6+"],
        //all the unique values from relevent column from transactions should be listed here;
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=rooms",
        is_mandatory: true,
      },
    ],
    outputs: [
      {
        key: "estimated_sales_value",
        label: "Estimated Sales Value",
        type: "estimationCard",
      },
      { key: "insights", label: "Insights", type: "insights" },
    ],
    calculate: async (inputs) => {
      const { usage_type, choose_location, property_type, property_area } =
        inputs;
      const current_year = 2024;
      // step 1: query the data base for properties which satisfies usage_type, choose_location, property_type from transactions data in the current year.
      try {
        const response = await axios.get(`${BASE_URL}/api/transaction/trends`, {
          params: {
            start_year: current_year,
            end_year: current_year,
            location: choose_location,
            property_type: property_type,
            usage_type: usage_type,
          },
        });

        //step 2: calculate the average value based on the above filter [per sqft value]
        const transactions = response.data.data.data;
        if (transactions?.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }
        console.log("transactions: ", transactions);
        const totalValue = transactions.reduce(
          (sum: number, transaction: any) => {
            const sqftValue = transaction.Total_area_in_meter * 10.764;
            const pricePerft =
              transaction.Total_Value_of_Transaction / sqftValue;
            return sum + pricePerft;
          },
          0
        );

        const totalConfidence = transactions.reduce(
          (sum: number, transaction: any) => {
            return sum + transaction.number_of_Row_Used;
          },
          0
        );

        const averageValuePerSqft = totalValue / transactions.length;
        const confidenceValue = totalConfidence;
        console.log(confidenceValue);
        //step 3: multiply the psqft value with property_area to get the estimated_sales_value
        const estimated_sales_value = averageValuePerSqft * property_area;
        return {
          estimated_sales_value: estimated_sales_value.toFixed(2),
          confidenceLevel: confidenceValue,
          insights: `Estimated sales value: AED ${FormatValue(
            estimated_sales_value.toFixed(2)
          )}. Calculation based on ${FormatValue(
            confidenceValue
          )} similar properties in ${choose_location}. Offers market-aligned value for quick decisions.`,
        };
      } catch (error) {
        console.error(`Error fetching data :`, error);
        return {
          estimated_sales_value: "Data not found for the specified filters.",
          insights: `Cannot calculate the estimated sales value.`,
        };
      }
      //step 4: exception: when the query by sending developer and project returns more than 25 values, average of this value is also displayed in the UI, ill show you how in the design.
      //step 5: exception: if the outcome of step 4 is less than 25 rows, then we query again only with developers or only with projects to get the average, and this shall be displayed in the UI as per design.
      // const average_sales_value =
      //   SUM(similar_transaction_values) / COUNT(similar_transactions);
    },
  },
  {
    key: "rental_value_estimator",
    name: "Rental Value Estimator",
    description:
      "Calculate the optimal rental price using property features and market benchmarks.",
    inputs: [
      {
        key: "property_selection",
        label: "Property Selector",
        type: "property_selector",
        is_mandatory: false,
      },
      {
        key: "usage_type",
        label: "Usage Type",
        type: "radio",
        options: ["Residential", "Commercial"],
        is_mandatory: true,
      },
      {
        key: "sale_type",
        label: "Sale Type",
        type: "radio",
        options: ["First Rental", "Renewal"],
        is_mandatory: true,
      },
      {
        key: "choose_location",
        label: "Choose Location",
        type: "dropdown",
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=location",
        options: [],
        //all the unique area_en from transactions should be listed here;

        placeholder: "select area",
        searchable: true,
        is_mandatory: true,
      },
      // {
      //   key: "select_developer",
      //   label: "Select Developer",
      //   type: "dropdown",
      //   options: ["A", "B", "C", "D"],
      //   //all the unique developers from transactions should be listed here;
      //   source:
      //     "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=developer_en",
      //   placeholder: "select developer",
      //   searchable: true,
      //   is_mandatory: false,
      // },
      {
        key: "choose_project",
        label: "Choose Project",
        type: "dropdown",
        options: [
          "BLUE BAY",
          "SILICON GATE 3",
          "CLAREN 2",
          "AZURE RESIDENCE",
          "Azizi. Liatris",
        ],
        //all the unique projects from transactions should be listed here;

        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=project_en",
        placeholder: "select project",
        searchable: true,
        is_mandatory: false,
      },
      {
        key: "property_type",
        label: "Property Type",
        type: "dropdown",
        options: ["Villa", "Unit", "Building", "Land"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=property_type",
        //options will change based on the usage type if its residential/commercial; also this list might be incomplete!
        placeholder: "select type",
        is_mandatory: true,
      },
      {
        key: "property_area",
        label: "Property Area",
        type: "slider",
        sliderText: "SQFT",
        min: 50,
        max: 10000,
        step: 10,
        default_value: 100,
        is_mandatory: true,
      },
      {
        key: "no_of_bedrooms",
        label: "No. of Bedrooms",
        type: "dropdown",
        options: [1, 2, 3, 4, 5, "6+"],
        source:
          "https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/constants?type=rooms",
        is_mandatory: true,
      },
    ],
    outputs: [
      {
        key: "estimated_rental_value",
        label: "Estimated Rental Value",
        type: "estimationCard",
      },
      { key: "insights", label: "Insights", type: "insights" },
    ],

    calculate: async (inputs) => {
      const {
        usage_type,
        sale_type,
        choose_location,
        choose_project,
        property_type,
      } = inputs;
      const current_year = new Date().getFullYear();
      // step 1: query the data base for properties which satisfies usage_type, choose_location, property_type from transactions data in the current year.
      try {
        const response = await axios.get(`${BASE_URL}/api/rental`, {
          params: {
            year: current_year,
            area_en: choose_location,
            property_type: property_type,
            usage_type: usage_type,
          },
        });
        console.log("response: ", response);
        //step 2: calculate the average value based on the above filter [per sqft value]
        const rentalDatas = response.data.data.data;
        if (rentalDatas.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }
        console.log("rentalDatas Calc: ", rentalDatas);
        const totalValue = rentalDatas.reduce((sum: number, rents: any) => {
          const startDate = new Date(rents.START_DATE.value);
          const endDate = new Date(rents.END_DATE.value);
          const totalYears = endDate.getFullYear() - startDate.getFullYear();

          const rentPerMonth = rents.ANNUAL_AMOUNT
            ? rents.ANNUAL_AMOUNT
            : rents.CONTRACT_AMOUNT / totalYears;
          return sum + rentPerMonth;
        }, 0);

        const totalConfidence = rentalDatas.reduce(
          (sum: number, rentalData: any) => {
            return sum + rentalData.number_of_Row_Used;
          },
          0
        );

        const estimated_rental_value = totalValue / rentalDatas.length;
        return {
          estimated_rental_value: estimated_rental_value.toFixed(2),
          confidenceLevel: totalConfidence,
          insights: `Estimated rental value: AED ${FormatValue(
            estimated_rental_value.toFixed(2)
          )} annualy (${FormatValue(
            (estimated_rental_value / 12).toFixed(2)
          )} monthly). Derived from ${FormatValue(
            totalConfidence
          )} properties in ${choose_location}. Helps assess realistic rental pricing.`,
        };
      } catch (error) {
        console.error(`Error fetching data :`, error);
        return {
          estimated_rental_value: "Data not found for the specified filters.",
          insights: `Cannot calculate the estimated sales value.`,
        };
      }
      //calculation approach is same as the sales_value_estimator
      // const average_rental_value =
      //   SUM(similar_rental_values) / COUNT(similar_rental_transactions);
    },
  },
  {
    key: "mortgage_payment_calculator",
    name: "Mortgage Payment Calculator",
    description:
      "Calculate mortgage payments, rates, and affordability for property financing.",
    outputTitle: "Mortgage Details",
    inputs: [
      {
        key: "property_price",
        label: "Property Price",
        type: "currency_text",
        is_mandatory: true,
        helper_text: "Enter the total property price.",
      },
      {
        key: "down_payment",
        label: "Down Payment",
        type: "currency_text",
        is_mandatory: true,
        helper_text: "Enter your down payment.",
      },
      {
        key: "interest_rate",
        label: "Interest Rate",
        type: "slider",
        sliderText: "%",
        min: 1,
        max: 10,
        step: 0.1,
        default_value: 4.5,
        is_mandatory: true,
        helper_text: "Select your interest rate.",
      },
      {
        key: "mortgage_duration",
        label: "Mortgage Duration",
        type: "slider",
        sliderText: "Years",
        min: 1,
        max: 30,
        step: 1,
        default_value: 20,
        is_mandatory: true,
        helper_text: "Select mortgage duration (years).",
      },
    ],
    outputs: [
      {
        key: "emi",
        label: "Monthly EMI",
        type: "metric",
      },
      {
        key: "total_interest",
        label: "Total Interest",
        type: "comparison",
        secondary_output: {
          key: "total_principal",
          label: "Total Principal",
          type: "comparison",
        },
      },
      {
        key: "grand_total",
        label: "Grand Total",
        type: "metric",
      },
      {
        key: "total_payment_breakup_pie",
        label: "Total payment breakup",
        type: "pie_chart",
        chartConfig: {
          "Priciple Loan Amount": { color: "#FFC8C8" },
          "Total Interest": { color: "#EFEEFC" },
        },
      },
      {
        key: "amortization_stacked_bar_chart",
        label: "Payment amortisation",
        type: "two_charts",
        chartConfig: {
          principal: { color: "#F0FCF3" },
          interest: { color: "#FFEDED" },
        },
        secondary_output: {
          key: "balance_chart",
          label: "Balance Chart",
          type: "two_charts",
          chartConfig: { Balance: { color: "#FFC8C8" } },
        },
        subChart: [
          {
            key: "amortization_table",
            label: "Amortization Table",
            type: "table",
          },
        ],
      },
      {
        key: "amortization_table",
        label: "Amortization Table",
        type: "table",
      },
      {
        key: "insight",
        label: "Insight",
        type: "insights",
      },
    ],
    calculate: (inputs) => {
      const { property_price, down_payment, interest_rate, mortgage_duration } =
        inputs;

      const loan_amount = property_price - down_payment;
      const monthly_rate = interest_rate / 12 / 100;
      const n_payments = mortgage_duration * 12;
      const emi_payment_monthly =
        (loan_amount * monthly_rate * Math.pow(1 + monthly_rate, n_payments)) /
        (Math.pow(1 + monthly_rate, n_payments) - 1);

      let balance = loan_amount;
      const amortizationSchedule = [];
      const lineChartData = [];
      const tableData = [];
      let totalInterest = 0;
      const currentYear = new Date().getFullYear();
      for (let year = 1; year <= mortgage_duration; year++) {
        let principalPaidYearly = 0;
        let interestPaidYearly = 0;

        for (let month = 1; month <= 12; month++) {
          const interestPayment = balance * monthly_rate;
          const principalPayment = emi_payment_monthly - interestPayment;

          interestPaidYearly += interestPayment;
          principalPaidYearly += principalPayment;
          balance -= principalPayment;

          // Accumulate total interest paid
          totalInterest += interestPayment;

          // If balance reaches 0, we break out of the loop early
          if (balance <= 0) {
            balance = 0;
            break;
          }
        }

        amortizationSchedule.push({
          Year: currentYear + year - 1,
          Principal: principalPaidYearly.toFixed(2),
          Interest: interestPaidYearly.toFixed(2),
        });
        lineChartData.push({
          Year: currentYear + year - 1,
          Balance: balance.toFixed(2),
        });
        tableData.push({
          Year: currentYear + year - 1,
          Principal: principalPaidYearly.toFixed(2),
          Interest: interestPaidYearly.toFixed(2),
          Balance: balance.toFixed(2),
        });

        if (balance === 0) break; // End the loop if the loan is fully repaid
      }

      // Calculating Total Payment
      const totalPayment = loan_amount;
      const interestPercentage = ((totalInterest / totalPayment) * 100).toFixed(
        2
      );

      const grandTotal = parseFloat(down_payment) + totalInterest + loan_amount;

      const insights = `Your monthly payment: AED ${FormatValue(
        emi_payment_monthly.toFixed(2)
      )}. Total interest cost: AED ${FormatValue(
        totalInterest.toFixed(2)
      )} (${interestPercentage}% of total payments); principal covers the remaining ${
        100 - parseFloat(interestPercentage)
      }%.`;
      console.log(insights);
      return {
        emi: emi_payment_monthly.toFixed(2),
        total_interest: totalInterest.toFixed(2),
        total_principal: totalPayment.toFixed(2),
        grand_total: grandTotal.toFixed(2),
        total_payment_breakup_pie: [
          {
            name: "Priciple Loan Amount",
            value: loan_amount.toFixed(2),
            colorClass: "bg-[#FFC8C8]",
          },
          {
            name: "Total Interest",
            value: totalInterest.toFixed(2),
            colorClass: "bg-[#EFEEFC]",
          },
        ],
        amortization_stacked_bar_chart: amortizationSchedule,
        balance_chart: lineChartData,
        amortization_table: {
          columns: ["Year", "Principal", "Interest", "Balance"],
          data: tableData,
        },
        insight: insights,
      };
    },
  },
  {
    key: "investment_roi_calculator",
    name: "Investment ROI Estimator",
    description:
      "Estimate property investment returns and future profitability for better decision-making.",
    outputTitle: "ROI Analysis",
    inputs: [
      {
        key: "property_selection",
        label: "Property Selector",
        type: "property_selector",
        is_mandatory: false,
      },
      {
        key: "purchase_price",
        label: "Purchase Price",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "annual_rental_income",
        label: "Annual Rental Income",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "annual_appreciation_rate",
        label: "Annual Appreciation Rate",
        type: "slider_with_text",
        min: 0,
        max: 100,
        step: 1,
        default_value: 5,
        is_mandatory: false,
      },
      {
        key: "holding_period",
        label: "Holding Period",
        type: "slider_with_text",
        default_value: 10,
        min: 1,
        max: 40,
        is_mandatory: true,
      },
      {
        key: "annual_operating_expenses",
        label: "Annual Operating Expenses (AED)",
        type: "switch",
        options: [
          {
            key: "property_size_sqft",
            label: "Property Size (SQFT)",
            type: "value",
            is_mandatory: true,
          },
          {
            key: "service_charges_per_sqft",
            label: "Service Charges (SQFT)",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "total_service_charge",
            label: "Total Service Charge",
            type: "read_only_auto_compute", // auto compute = property_size_sqft*service_charges_per_sqft
            calculateFrom: ["property_size_sqft", "service_charges_per_sqft"],
            calculateValue: (calculateFrom) =>
              parseFloat(calculateFrom[0]) * parseFloat(calculateFrom[1]),
            is_mandatory: true,
          },
          {
            key: "maintenance_costs",
            label: "Maintenance Costs",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "property_management_fees",
            label: "Property Management Fees",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "insaurance_costs",
            label: "Insurance Costs",
            type: "currency_text",
            is_mandatory: true,
          },
        ],
        is_mandatory: false,
      },

      {
        key: "purchase_cost",
        label: "Purchase Cost",

        type: "switch",
        options: [
          {
            key: "dld_fee",
            label: "DLD Fee",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "other_fee",
            label: "Other Fee",
            type: "currency_text",
            max: 10000,
            min: 1000,
            step: 100,
            helper_text: "Including Broker fee, Legel fee, Extro fee etc.",
            is_mandatory: true,
          },
        ],
        is_mandatory: false,
      },

      {
        key: "mortgage",
        label: "Mortgage",
        type: "switch",
        options: [
          {
            key: "down_payment",
            label: "Down Payment",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "mortgage_tenure",
            label: "Mortgage Tenure",
            type: "slider",
            sliderText: "years",
            default_value: 10,
            min: 1,
            max: 40,
            is_mandatory: true,
          },
          {
            key: "interest_rate",
            label: "Interest Rate",
            type: "slider",
            sliderText: "%",
            min: 1,
            max: 10,
            step: 0.1,
            default_value: 4.5,
            is_mandatory: true,
          },
        ],
        is_mandatory: false,
      },
    ],
    outputs: [
      {
        key: "roi_before_expenses_and_mortgage",
        label: "ROI (Before Expenses / Mortgage)",
        type: "grouped_output",
        grouped_output: [
          {
            key: "annualized_roi",
            label: "Annualized ROI",
            type: "two_metrics",
            percentage: "annualized_percentage",
            secondary_output: {
              key: "total_roi",
              label: "Total ROI",
              type: "two_metrics",
              percentage: "total_percentage",
            },
          },
          {
            key: "annualized_capital_appreciation",
            label: "Annualised Capital Appreciation",
            type: "comparison",
            secondary_output: {
              key: "annual_rental_income",
              label: "Annual Rental Income",
              type: "comparison",
            },
          },
          {
            key: "roi_growth_over_time",
            label: "ROI growth overtime",
            type: "line_chart",
            chartConfig: {
              rental_income: { color: "#8177E5" },
              capital_appreciation: { color: "#121212" },
            },
          },
          {
            key: "total_rental_income",
            label: "Total Rental Income",
            type: "comparison",

            secondary_output: {
              key: "total_appreciation",
              label: "Total Capital Appreciation",
              type: "comparison",
            },
          },
        ],
      },

      {
        key: "roi_after_expenses",
        label: "ROI After Expenses",
        type: "grouped_output",
        grouped_output: [
          {
            key: "total_annual_expenses",
            label: "Total Annual Expenses (AED)",
            type: "three_metrics",
            secondary_output: {
              key: "total_monthly_expenses",
              label: "Total Monthly Expenses (AED)",
              type: "three_metrics",
              secondary_output: {
                key: "initial_purchage_cost",
                label: "Initial Purchage Cost (AED)",
                type: "three_metrics",
              },
            },
          },
          {
            key: "total_roi_after_expenses",
            label: "Total ROI (After Expenses)",
            type: "metric",
            percentage: "total_roi_after_expenses_percentage",
          },
        ],
      },

      {
        key: "roi_after_mortgage",
        label: "ROI After Mortgage",
        type: "grouped_output",
        grouped_output: [
          {
            key: "monthly_mortgage_payment",
            label: "Monthly Mortgage Payment",
            type: "comparison",
            secondary_output: {
              key: "total_interest_paid",
              label: "Total Interest Paid In Mortgage",
              type: "comparison",
            },
          },
          {
            key: "total_roi_after_mortgage",
            label: "Total ROI (After Expenses & Mortgage)",
            type: "metric",
            percentage: "total_roi_after_mortgage_percentage",
          },
        ],
      },

      {
        key: "insights",
        label: "Insight",
        type: "insights",
      },
    ],
    calculate: (inputs) => {
      const {
        purchase_price,
        annual_appreciation_rate,
        holding_period,
        annual_rental_income,
        annual_operating_expenses,
        purchase_cost,
        mortgage,
      } = inputs;
      // i think code should be something like below: Property Value at Year N=Initial Property Price×(1+Annual Appreciation Rate) power N

      const totalServiceCharge = parseFloat(
        annual_operating_expenses["total_service_charge"]
      );
      const maintenanceCosts =
        parseFloat(annual_operating_expenses["maintenance_costs"]) || 0;
      const propertyManagementFees =
        parseFloat(annual_operating_expenses["property_management_fees"]) || 0;
      const insuranceCosts =
        parseFloat(annual_operating_expenses["insaurance_costs"]) || 0;
      const dldFee = parseFloat(purchase_cost["dld_fee"]) || 0;
      const otherFee = parseFloat(purchase_cost["other_fee"]) || 0;
      const mortgageTenure = parseFloat(mortgage["mortgage_tenure"]) || 0;
      const interestRate = parseFloat(mortgage["interest_rate"]) || 0;
      const downPayment = parseFloat(mortgage["down_payment"]) || 0;

      const loanAmount = purchase_price - downPayment;
      const monthlyInterestRate = interestRate / 12 / 100;
      const totalPayments = mortgageTenure * 12;

      console.log("annual_operating_expenses: ", maintenanceCosts);
      const totalAnnualExpenses =
        totalServiceCharge +
        maintenanceCosts +
        propertyManagementFees +
        insuranceCosts;
      const totalMonthlyExpenses = totalAnnualExpenses / 12;
      const initial_purchage_cost = dldFee + otherFee;

      const purchasePrice = parseFloat(purchase_price);
      const annualAppreciationRate = parseFloat(annual_appreciation_rate) / 100; // Convert % to decimal
      const holdingPeriod = parseInt(holding_period);
      const annualRentalIncome = parseFloat(annual_rental_income);

      const monthlyMortgagePayment =
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments)) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

      const totalInterestPaid =
        monthlyMortgagePayment * totalPayments - loanAmount;

      // Calculate the total property value at the end of the holding period
      // Property Value at Year N = Initial Property Price × (1 + Annual Appreciation Rate)^N
      const futurePropertyValue =
        purchasePrice * Math.pow(1 + annualAppreciationRate, holdingPeriod);

      // Calculate the total capital appreciation (increase in property value)
      const totalCapitalAppreciation = futurePropertyValue - purchasePrice;

      // Calculate the total rental income over the holding period
      const totalRentalIncome = annualRentalIncome * holdingPeriod;

      // Total return is the sum of capital appreciation and rental income
      const totalReturn = totalCapitalAppreciation + totalRentalIncome;

      // Calculate the annualized ROI (annual return on investment)
      const annualizedROI = totalReturn / holdingPeriod;

      // Calculate the annualized capital appreciation
      const annualizedCapitalAppreciation =
        totalCapitalAppreciation / holdingPeriod;

      const total_roi_after_expenses =
        purchasePrice +
        totalRentalIncome +
        totalCapitalAppreciation -
        totalAnnualExpenses * holdingPeriod -
        initial_purchage_cost;

      const total_roi_after_expenses_percentage =
        (total_roi_after_expenses / purchasePrice) * 100;

      const totalROIAfterMortgage =
        purchasePrice +
        totalRentalIncome +
        totalCapitalAppreciation -
        totalAnnualExpenses * holdingPeriod -
        initial_purchage_cost -
        totalInterestPaid;

      const totalROIAfterMortgagePercentage =
        (totalROIAfterMortgage / purchasePrice) * 100;

      // Calculate the annual rental income (this is just the same as annual_rental_income)
      const annualRentalIncomePerYear = totalRentalIncome / holdingPeriod;

      const breakdown = [];
      for (let year = 1; year <= holdingPeriod; year++) {
        const annualAppreciation =
          purchasePrice * Math.pow(1 + annualAppreciationRate, year);
        const capital_appreciation = annualAppreciation - purchasePrice;
        const annual_rents = annualRentalIncome * year;
        breakdown.push({
          year: 2023 + year,
          rental_income: annual_rents,
          capital_appreciation: capital_appreciation,
        });
      }
      console.log("breakdown: ", breakdown);

      const totalProfitPercentage = (
        (totalReturn / purchasePrice) *
        100
      ).toFixed(2);

      const annualizedPercentage = (
        (Math.pow(futurePropertyValue / purchasePrice, 1 / holdingPeriod) - 1) *
        100
      ).toFixed(2);

      const insight = `With an annual growth rate of ${(
        annualAppreciationRate * 100
      ).toFixed(
        2
      )}% and potential rental yield, a ${holdingPeriod}-year investment could appreciate to AED ${FormatValue(
        annualizedROI.toFixed(2)
      )}, achieving a ${totalProfitPercentage}% return compared to the original investment—an attractive yield compared to alternative investments.`;

      return {
        annualized_roi: annualizedROI.toFixed(2),
        annualized_capital_appreciation:
          annualizedCapitalAppreciation.toFixed(2),
        total_roi: totalReturn.toFixed(2),
        total_annual_expenses: totalAnnualExpenses.toFixed(2),
        total_monthly_expenses: totalMonthlyExpenses.toFixed(2),
        initial_purchage_cost: initial_purchage_cost.toFixed(2),
        total_roi_after_expenses: total_roi_after_expenses.toFixed(2),
        total_roi_after_expenses_percentage:
          total_roi_after_expenses_percentage.toFixed(2),
        total_roi_after_mortgage: totalROIAfterMortgage.toFixed(2),
        total_roi_after_mortgage_percentage:
          totalROIAfterMortgagePercentage.toFixed(2),
        monthly_mortgage_payment: monthlyMortgagePayment.toFixed(2),
        total_interest_paid: totalInterestPaid.toFixed(2),
        annualized_percentage: annualizedPercentage,
        total_percentage: totalProfitPercentage,
        annual_rental_income: annualRentalIncome.toFixed(2),
        total_rental_income: totalRentalIncome.toFixed(2),
        total_appreciation: totalCapitalAppreciation.toFixed(2),
        roi_growth_over_time: breakdown,
        insights: insight,
      };
    },
  },
  {
    key: "rent_vs_buy_comparison_tool",
    name: "Rent vs Buy Comparison Tool",
    description:
      "Compare financial benefits of renting versus buying a property over time.",
    outputTitle: "Rent vs Buy Analysis",
    inputs: [
      {
        key: "home_price",
        label: "What is your comfortable home price?",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "down_payment",
        label: "How much is your down payment?",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "monthly_rent",
        // i prefer to change this to annual rent instead
        label: "What is comfortable monthly rent?",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "rent_duration",
        label: "How long you are planning to rent (years)?",
        type: "slider",
        sliderText: "Years",
        min: 1,
        max: 30,
        step: 1,
        default_value: 5,
        is_mandatory: true,
      },
      {
        key: "mortgage_rate",
        label: "Mortgage rate?",
        type: "slider",
        sliderText: "%",
        min: 3,
        max: 10,
        step: 0.1,
        default_value: 5,
        is_mandatory: true,
      },
    ],
    outputs: [
      {
        key: "rent_vs_buy_chart",
        label: "Rent vs Buy Comparison",
        type: "stacked_bar_chart",
        chartConfig: {
          principal: { color: "#F0FCF3" },
          interest: { color: "#FFEDED" },
        },
      },
      {
        key: "monthly_payment_comparison_chart",
        label: "Total Monthly Payments",
        chartConfig: {
          Rent: { color: "#FFC8C8" },
          Buy: { color: "#EFEEFC" },
        },
        type: "bar_chart",
      },
      {
        key: "total_payment_comparison_chart",
        label: "Overall Payment Comparison",
        type: "bar_chart",
        chartConfig: {
          Rent: { color: "#FFC8C8" },
          Buy: { color: "#EFEEFC" },
        },
      },
    ],
    calculate: (inputs) => {
      let {
        home_price,
        down_payment,
        monthly_rent,
        mortgage_rate,
        rent_duration,
      } = inputs;

      const homePrice = parseFloat(home_price);
      const downPayment = parseFloat(down_payment);
      const monthlyRent = parseFloat(monthly_rent);
      const mortgageRate = parseFloat(mortgage_rate);
      const holdingPeriod = parseInt(rent_duration);

      const annualAppreciationRate = 0.05;
      let totalRentPaid = 0;
      let mortgagePayment = ((home_price - down_payment) * mortgage_rate) / 12;
      let totalMortgagePaid = 0;
      let propertyValue = homePrice;
      const loanAmount = homePrice - downPayment;
      const monthlyRate = mortgageRate / 100 / 12;
      const loanTermYears = holdingPeriod;
      const numberOfPayments = loanTermYears * 12;
      const monthlyBuyPayment =
        (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalBuyPayment =
        monthlyBuyPayment * (holdingPeriod * 12) + downPayment;

      const annualCosts = [];
      let remainingLoanAmount = loanAmount;
      for (let year = 1; year <= holdingPeriod; year++) {
        const rentCost = monthlyRent * 12 * year;
        const interestPayment = remainingLoanAmount * monthlyRate;
        const principalPayment = monthlyBuyPayment - interestPayment;
        remainingLoanAmount -= principalPayment;
        annualCosts.push({
          year: `year ${year}`,
          rentCost: rentCost.toFixed(2),
          buyCost: remainingLoanAmount.toFixed(2),
        });
      }

      let breakevenYear = null;
      for (let year = 1; year <= rent_duration; year++) {
        totalRentPaid += monthly_rent * 12;
        totalMortgagePaid += mortgagePayment * 12;
        propertyValue *= 1 + annualAppreciationRate;

        // Adjust rent and mortgage as needed
        if (totalMortgagePaid >= totalRentPaid && !breakevenYear) {
          breakevenYear = year;
        }
      }

      const totalCostOfBuying = down_payment + totalMortgagePaid;
      const comparisonValue = totalCostOfBuying - totalRentPaid;

      let insights = [];
      if (comparisonValue > 0) {
        insights.push(
          "Renting is currently cost-effective. However, if you plan to stay for over 10 years, buying becomes financially advantageous."
        );
      } else {
        insights.push(
          "Given the projected rent, buying surpasses renting in long-term financial benefits."
        );
      }

      if (breakevenYear) {
        insights.push(
          `Buying becomes advantageous after ${breakevenYear} years of ownership.`
        );
      }

      if (monthly_rent > mortgagePayment) {
        insights.push(
          "Buying a property may provide greater stability and investment benefits than renting, especially in high-demand areas."
        );
      }
      const insightsString = insights.join("\n");
      // const insights =
      //   comparisonValue > 0
      //     ? "Renting is more beneficial than buying."
      //     : "Buying is more beneficial than renting.";

      // // Example usage
      // const insight = rentVsBuyComparison(
      //   2500, // Monthly rent
      //   500000, // Property price
      //   100000, // Down payment
      //   0.05, // 5% mortgage rate
      //   10, // Holding period in years
      //   3, // Annual rent increase (in %)
      //   5 // Annual property appreciation (in %)
      // );
      // console.log(insight);

      return {
        rent_vs_buy_chart: annualCosts,
        monthly_payment_comparison_chart: [
          {
            category: "Rent",
            value: monthlyRent.toFixed(2),
            fill: "#DDDAF9",
          },
          {
            category: "Buy",
            value: monthlyBuyPayment.toFixed(2),
            fill: "#F0FCF3",
          },
        ],
        total_payment_comparison_chart: [
          {
            category: "Rent",
            value: totalRentPaid.toFixed(2),
            fill: "#DDDAF9",
          },
          {
            category: "Buy",
            value: totalBuyPayment.toFixed(2),
            fill: "#F0FCF3",
          },
        ],
        insights: insightsString,
      };
    },
  },
  {
    key: "home_affordability_calculator",
    name: "Home Affordability Calculator",
    description:
      "Assess the budget and affordability of purchasing a property based on finances.",
    inputs: [
      {
        key: "annual_income",
        label: "Annual Income",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "monthly_debts",
        label: "Monthly Debts",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "monthly_household_expenses",
        label: "Monthly Household Expense",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "monthly_income",
        label: "Monthly Income",
        type: "read_only_auto_compute",
        calculateFrom: ["annual_income"],
        calculateValue: (calculateFrom) => calculateFrom[0] / 12,
        is_mandatory: true,
      },
      {
        key: "monthly_expense",
        label: "Monthly Expense",
        type: "read_only_auto_compute",
        calculateFrom: ["monthly_debts", "monthly_household_expenses"],
        calculateValue: (calculateFrom) =>
          parseFloat(calculateFrom[0]) + parseFloat(calculateFrom[1]),
        is_mandatory: true,
      },
      {
        key: "available_monthly_savings",
        label: "Available Monthly Savings",
        type: "read_only_auto_compute",
        calculateFrom: ["monthly_income", "monthly_expense"],
        calculateValue: (calculateFrom) =>
          parseFloat(calculateFrom[0]) - parseFloat(calculateFrom[1]),
        is_mandatory: true,
      },
      {
        key: "mortgage_rate",
        label: "Mortgage Rate",
        type: "slider",
        min: 1,
        max: 15,
        step: 1,
        default_value: 4.5,
        is_mandatory: true,
      },
      {
        key: "down_payment",
        label: "Down Payment",
        type: "currency_text",
        is_mandatory: true,
      },
      {
        key: "mortgage_duration",
        label: "Mortgage Duration",
        type: "slider",
        sliderText: "Years",
        min: 1,
        max: 30,
        step: 1,
        default_value: 15,
        is_mandatory: true,
      },
    ],
    outputs: [
      {
        key: "monthly_payment",
        label: "Monthly Payment",
        type: "variable_output",
      },
      // {
      //   key: "insight",
      //   label: "Insight",
      //   type: "insights",
      // },
    ],
    calculate: (inputs) => {
      const {
        monthly_income,
        monthly_debts,
        monthly_household_expenses,
        down_payment,
        mortgage_duration,
        mortgage_rate,
        available_monthly_savings,
      } = inputs;
      console.log("inputs Home: ", inputs);
      const insights =
        "Affordable property price calculated based on your finances.";

      return {
        monthly_income,
        monthly_debts,
        monthly_household_expenses,
        down_payment,
        mortgage_duration,
        mortgage_rate,
        available_monthly_savings,
      };
    },
  },
  {
    key: "incenstive_calculator",
    name: "Incentive Calculator",
    description:
      "Calculate agent incentives based on sales performance and targets.",
    inputs: [],
    outputs: [],
    tag: "upcoming",
    calculate: async () => {
      // Calculate agent incentives based on sales performance and targets
    },
  },
  {
    key: "commission_goal_planner",
    name: "Commission Goal Planner",
    description: "Set and plan commission goals to achieve earnings targets.",
    inputs: [],
    outputs: [],
    tag: "upcoming",
    calculate: async () => {
      // Calculate agent incentives based on sales performance and targets
    },
  },
  {
    key: "service_charges_estimator",
    name: "Service Charges Estimator",
    description:
      "Estimate service charges for different property types and locations.",
    inputs: [],
    outputs: [],
    tag: "upcoming",
    calculate: async () => {
      // Calculate agent incentives based on sales performance and targets
    },
  },
  {
    key: "investment_evaluation_report",
    name: "Investment Evaluation Report",
    description:
      "Assess potential ROI and evaluate long-term investment value.",
    inputs: [],
    outputs: [],
    tag: "upcoming",
    calculate: async () => {
      // Calculate agent incentives based on sales performance and targets
    },
  },
];
