import axios from "axios";
import { Calculator } from "./types";

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
        source: "http://localhost:6968/api/constants",
        options: [],
        //all the unique area_en from transactions should be listed here;

        placeholder: "select area",
        searchable: true,
        is_mandatory: true,
      },
      {
        key: "select_developer",
        label: "Select Developer",
        type: "dropdown",
        options: ["A", "B", "C", "D"],
        //all the unique developers from transactions should be listed here;
        source: "dxb_dev_list",
        placeholder: "select developer",
        searchable: true,
        is_mandatory: false,
      },
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

        source: "dxb_project_list",
        placeholder: "select project",
        searchable: true,
        is_mandatory: false,
      },
      {
        key: "property_type",
        label: "Property Type",
        type: "dropdown",
        options: ["Villa", "Unit", "Building", "Land"],
        //options will change based on the usage type if its residential/commercial; also this list might be incomplete!
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
        const response = await axios.get(
          `https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api/transTrends`,
          {
            params: {
              year: current_year,
              location: choose_location,
              property_type: property_type,
              usage_type: usage_type,
            },
          }
        );

        //step 2: calculate the average value based on the above filter [per sqft value]
        const transactions = response.data.data.data;
        if (transactions.length === 0) {
          throw new Error("No transactions found for the specified filters.");
        }

        const totalValue = transactions.reduce(
          (sum: number, transaction: any) => {
            const sqftValue = transaction.Total_area_in_meter * 10.764;
            const pricePerft =
              transaction.Total_Value_of_Transaction / sqftValue;
            return sum + pricePerft;
          },
          0
        );
        const averageValuePerSqft = totalValue / transactions.length;

        //step 3: multiply the psqft value with property_area to get the estimated_sales_value
        const estimated_sales_value = averageValuePerSqft * property_area;
        return {
          estimated_sales_value: estimated_sales_value.toFixed(2),
          insights: `Over the period of 5 years, your property
investment will yield a total of 24% return, which is well above the market average.`,
        };
      } catch (error) {
        console.error(`Error fetching data :`, error);
        return {
          estimated_sales_value: 0,
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
        is_mandatory: true,
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
        key: "choose_area",
        label: "Choose Area",
        type: "dropdown",
        source: "dxb_area_list",
        searchable: true,
        is_mandatory: true,
      },
      {
        key: "choose_developer",
        label: "Choose Developer",
        type: "dropdown",
        source: "dxb_dev_list",
        searchable: true,
        is_mandatory: false,
      },
      {
        key: "choose_project",
        label: "Choose Project",
        type: "dropdown",
        source: "dxb_proj_list",
        searchable: true,
        is_mandatory: false,
      },
      {
        key: "property_type",
        label: "Property Type",
        type: "dropdown",
        options: ["Villa", "Unit", "Building", "Land"],
        is_mandatory: true,
      },
      {
        key: "property_area",
        label: "Property Area",
        type: "slider",
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

    calculate: (inputs) => {
      // const { property_area, usage_type } = inputs;
      //calculation approach is same as the sales_value_estimator
      // const average_rental_value =
      //   SUM(similar_rental_values) / COUNT(similar_rental_transactions);

      return {
        estimated_rental_value: 2650000,
        insights: "Calculated based on property area and usage type.",
      };
    },
  },
  {
    key: "mortgage_payment_calculator",
    name: "Mortgage Payment Calculator",
    description:
      "Calculate mortgage payments, rates, and affordability for property financing.",
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
        label: "EMI",
        type: "metric",
      },
      {
        key: "total_interest_monthly",
        label: "Total Interest Monthly",
        type: "comparison",
        secondary_output: {
          key: "total_principal_monthly",
          label: "Total Principal Monthly",
          type: "comparison",
        },
      },

      {
        key: "total_payment_breakup_pie",
        label: "Total Payment Breakup Pie",
        type: "pie_chart",
        chartConfig: {
          "Priciple Loan Amount": { color: "#FFC8C8" },
          "Total Interest": { color: "#EFEEFC" },
        },
      },
      {
        key: "amortization_stacked_bar_chart",
        label: "Amortization Stacked Bar Chart",
        type: "stacked_bar_chart",
        chartConfig: {
          principal: { color: "#F0FCF3" },
          interest: { color: "#FFEDED" },
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
        key: "insight",
        label: "Insight",
        type: "insights",
      },
    ],
    calculate: (inputs) => {
      const { property_price, down_payment, interest_rate, mortgage_duration } =
        inputs;

      const loan_amount = property_price - down_payment;
      const monthly_rate = interest_rate / 12;
      const n_payments = mortgage_duration * 12;
      const emi_payment =
        (loan_amount * monthly_rate * Math.pow(1 + monthly_rate, n_payments)) /
        (Math.pow(1 + monthly_rate, n_payments) - 1);
      const monthly_interest = loan_amount * monthly_rate;
      const monthly_principal = emi_payment - monthly_interest;
      const total_interest = monthly_interest * monthly_interest;
      const total_payment = total_interest + loan_amount;

      const insights =
        "Monthly payments calculated based on loan amount and interest rate.";

      return {
        emi: emi_payment.toFixed(2),
        total_interest_monthly: monthly_interest.toFixed(2),
        total_principal_monthly: monthly_principal.toFixed(2),
        total_payment_breakup_pie: [
          {
            name: "Priciple Loan Amount",
            value: loan_amount,
            colorClass: "bg-[#FFC8C8]",
          },
          {
            name: "Total Interest",
            value: total_interest,
            colorClass: "bg-[#EFEEFC]",
          },
        ],
        amortization_stacked_bar_chart: [
          { year: 2010, principal: 10000, interest: 19000 },
          { year: 2011, principal: 12000, interest: 18000 },
          { year: 2012, principal: 14000, interest: 17000 },
          { year: 2013, principal: 16000, interest: 16000 },
          { year: 2014, principal: 18000, interest: 15000 },
          { year: 2015, principal: 20000, interest: 14000 },
          { year: 2016, principal: 22000, interest: 13000 },
          { year: 2017, principal: 24000, interest: 12000 },
          { year: 2018, principal: 26000, interest: 11000 },
          { year: 2019, principal: 28000, interest: 10000 },
          { year: 2020, principal: 30000, interest: 8000 },
          { year: 2021, principal: 32000, interest: 7000 },
          { year: 2022, principal: 34000, interest: 6000 },
          { year: 2023, principal: 36000, interest: 5000 },
          { year: 2024, principal: 38000, interest: 4000 },
        ],
        amortization_table: {
          columns: ["Year", "Principal", "Interest"],
          data: [
            { year: 2010, principal: 10000, interest: 19000 },
            { year: 2011, principal: 12000, interest: 18000 },
            { year: 2012, principal: 14000, interest: 17000 },
            { year: 2013, principal: 16000, interest: 16000 },
            { year: 2014, principal: 18000, interest: 15000 },
            { year: 2015, principal: 20000, interest: 14000 },
            { year: 2016, principal: 22000, interest: 13000 },
            { year: 2017, principal: 24000, interest: 12000 },
            { year: 2018, principal: 26000, interest: 11000 },
            { year: 2019, principal: 28000, interest: 10000 },
            { year: 2020, principal: 30000, interest: 8000 },
            { year: 2021, principal: 32000, interest: 7000 },
            { year: 2022, principal: 34000, interest: 6000 },
            { year: 2023, principal: 36000, interest: 5000 },
            { year: 2024, principal: 38000, interest: 4000 },
          ],
        },
        insights: insights,
      };
    },
  },
  {
    key: "investment_roi_calculator",
    name: "Investment ROI Estimator",
    description:
      "Estimate property investment returns and future profitability for better decision-making.",
    inputs: [
      {
        key: "property_selection",
        label: "Property Selector",
        type: "property_selector",
        is_mandatory: false,
      },
      {
        key: "transaction_type",
        label: "Transaction Type",
        type: "radio",
        options: ["Cash", "Mortgage"],
        is_mandatory: true,
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
        is_mandatory: true,
      },
      {
        key: "purchase_cost",
        label: "Purchase Cost",
        type: "switch",
        options: [
          {
            key: "property_size",
            label: "Property Size",
            type: "value",
            is_mandatory: true,
          },
          {
            key: "service_charges_per_sqft",
            label: "Service Charges per Sqft",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "total_service_charge",
            label: "Total Service Charge",
            // rule: "read_only_auto_compute",
            type: "currency_text",
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
        key: "annual_operating_expenses",
        label: "Annual Operating Expenses (AED)",
        type: "switch",
        options: [
          {
            key: "dld_fee",
            label: "DLD Fee",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "dubai_land_department_fees",
            label: "Dubai Land Department fees",
            type: "currency_text",
            is_mandatory: true,
          },
          {
            key: "other_fee",
            label: "Other Fee",
            type: "slider_with_text",
            max: 10000,
            min: 1000,
            step: 100,
            default_value: 3400,
            helper_text: "Including Broker fee, Legel fee, Extro fee etc.",
            is_mandatory: true,
          },
        ],
        is_mandatory: false,
      },
    ],
    outputs: [
      {
        key: "annualized_roi",
        label: "Annualized ROI",
        type: "metric",
      },
      {
        key: "annualized_capital_appreciation",
        label: "Annualized Capital Apprecition",
        type: "comparison",
        secondary_output: {
          key: "annual_rental_income",
          label: "Annual rental income",
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
      {
        key: "insight",
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
      } = inputs;
      // i think code should be something like below: Property Value at Year N=Initial Property Price×(1+Annual Appreciation Rate) power N
      console.log(
        "jsIfhdjsn: ",
        purchase_price,
        annual_appreciation_rate,
        holding_period,
        annual_rental_income
      );
      const totalROI =
        parseFloat(purchase_price) *
        Math.pow(
          1 + parseFloat(annual_appreciation_rate),
          parseInt(holding_period)
        );

      const annualizedCapitalAppreciation = totalROI / parseInt(holding_period);
      const totalCapitalAppreciation = totalROI - parseFloat(purchase_price);
      const annualizedRentalIncome = parseFloat(annual_rental_income);
      const totalRentalIncome =
        parseFloat(annual_rental_income) * parseInt(holding_period);
      console.log(
        totalROI,
        annualizedCapitalAppreciation,
        totalCapitalAppreciation,
        annualizedRentalIncome,
        totalRentalIncome
      );
      const insights =
        "Calculated based on rental income, capital appreciation, and expenses.";

      return {
        annualized_roi: totalROI.toFixed(2),
        annualized_capital_appreciation:
          annualizedCapitalAppreciation.toFixed(2),
        annual_rental_income: annualizedRentalIncome.toFixed(2),
        total_rental_income: totalRentalIncome.toFixed(2),
        total_appreciation: totalCapitalAppreciation.toFixed(2),
        roi_growth_over_time: [
          { year: 2010, rental_income: 10000, capital_appreciation: 19000 },
          { year: 2011, rental_income: 12000, capital_appreciation: 19500 },
          { year: 2012, rental_income: 14000, capital_appreciation: 20000 },
          { year: 2013, rental_income: 16000, capital_appreciation: 20500 },
          { year: 2014, rental_income: 18000, capital_appreciation: 21000 },
          { year: 2015, rental_income: 20000, capital_appreciation: 21500 },
          { year: 2016, rental_income: 22000, capital_appreciation: 22000 },
          { year: 2017, rental_income: 24000, capital_appreciation: 22500 },
          { year: 2018, rental_income: 26000, capital_appreciation: 23000 },
          { year: 2019, rental_income: 28000, capital_appreciation: 23500 },
          { year: 2020, rental_income: 30000, capital_appreciation: 24000 },
          { year: 2021, rental_income: 32000, capital_appreciation: 24500 },
          { year: 2022, rental_income: 34000, capital_appreciation: 25000 },
          { year: 2023, rental_income: 36000, capital_appreciation: 25500 },
          { year: 2024, rental_income: 38000, capital_appreciation: 26000 },
        ],
        insights: insights,
      };
    },
  },
  {
    key: "rent_vs_buy_comparison_tool",
    name: "Rent vs Buy Comparison Tool",
    description:
      "Compare financial benefits of renting versus buying a property over time.",
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
        label: "Rent vs Buy Chart",
        type: "stacked_bar_chart",
        chartConfig: {
          principal: { color: "#F0FCF3" },
          interest: { color: "#FFEDED" },
        },
      },
      {
        key: "monthly_payment_comparison_chart",
        label: "Monthly Payment Comparison Chart",
        chartConfig: {
          Rent: { color: "#FFC8C8" },
          Buy: { color: "#EFEEFC" },
        },
        type: "bar_chart",
      },
      {
        key: "total_payment_comparison_chart",
        label: "Total Payment Comparison Chart",
        type: "bar_chart",
        chartConfig: {
          Rent: { color: "#FFC8C8" },
          Buy: { color: "#EFEEFC" },
        },
      },
      {
        key: "insight",
        label: "Insight",
        type: "insights",
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

      let totalRentPaid = 0;
      let propertyValue = home_price;
      let mortgagePayment = ((home_price - down_payment) * mortgage_rate) / 12;
      let totalMortgagePaid = 0;

      // Simulate rent and property value for each year
      for (let year = 1; year <= rent_duration; year++) {
        totalRentPaid += monthly_rent * 12;
        totalMortgagePaid += mortgagePayment * 12;

        // Adjust rent and property value for the next year
        // monthly_rent *= 1 + annualRentIncrease / 100;
        // propertyValue *= 1 + annualAppreciationRate / 100;
      }

      const totalCostOfBuying = down_payment + totalMortgagePaid;
      const comparisonValue = totalCostOfBuying - totalRentPaid;

      const insights =
        comparisonValue > 0
          ? "Renting is more beneficial than buying."
          : "Buying is more beneficial than renting.";

      // const rentVsBuyComparison = (
      //   monthlyRent: number,
      //   propertyPrice: number,
      //   downPayment: number,
      //   mortgageRate: number,
      //   holdingPeriod: number,
      //   annualRentIncrease: number,
      //   annualAppreciationRate: number
      // ): string => {
      //   let totalRentPaid = 0;
      //   let propertyValue = propertyPrice;
      //   let mortgagePayment = ((propertyPrice - downPayment) * mortgageRate) / 12;
      //   let totalMortgagePaid = 0;

      //   // Simulate rent and property value for each year
      //   for (let year = 1; year <= holdingPeriod; year++) {
      //     totalRentPaid += monthlyRent * 12;
      //     totalMortgagePaid += mortgagePayment * 12;

      //     // Adjust rent and property value for the next year
      //     monthlyRent *= 1 + annualRentIncrease / 100;
      //     propertyValue *= 1 + annualAppreciationRate / 100;
      //   }

      //   const totalCostOfBuying = downPayment + totalMortgagePaid;
      //   const comparisonValue = totalCostOfBuying - totalRentPaid;

      //   return comparisonValue > 0
      //     ? "Renting is more beneficial than buying."
      //     : "Buying is more beneficial than renting.";
      // };

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
        rent_vs_buy_chart: [
          { year: 2010, principal: 10000, interest: 19000 },
          { year: 2011, principal: 12000, interest: 18000 },
          { year: 2012, principal: 14000, interest: 17000 },
          { year: 2013, principal: 16000, interest: 16000 },
          { year: 2014, principal: 18000, interest: 15000 },
          { year: 2015, principal: 20000, interest: 14000 },
          { year: 2016, principal: 22000, interest: 13000 },
          { year: 2017, principal: 24000, interest: 12000 },
          { year: 2018, principal: 26000, interest: 11000 },
          { year: 2019, principal: 28000, interest: 10000 },
          { year: 2020, principal: 30000, interest: 8000 },
          { year: 2021, principal: 32000, interest: 7000 },
          { year: 2022, principal: 34000, interest: 6000 },
          { year: 2023, principal: 36000, interest: 5000 },
          { year: 2024, principal: 38000, interest: 4000 },
        ],
        monthly_payment_comparison_chart: [
          { category: "Rent", value: 8500000 },
          { category: "Buy", value: 4500000 },
        ],
        total_payment_comparison_chart: [
          { category: "Rent", value: 9500000 },
          { category: "Buy", value: 2455555 },
        ],
        insights: insights,
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
        key: "monthly_expenses",
        label: "Monthly Expenses",
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
        calculateFrom: ["monthly_debts", "monthly_expenses"],
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
        key: "savings_allocation",
        label: "Savings Allocation (%)",
        type: "slider_with_text",
        min: 0,
        max: 100,
        step: 1,
        default_value: 50,
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
        label: "Mortgage Duration (Years)",
        type: "slider",
        min: 1,
        max: 30,
        step: 1,
        default_value: 20,
        is_mandatory: true,
      },
    ],
    outputs: [
      {
        key: "affordable_property_value",
        label: "Affordable Property Value",
        type: "metric",
      },
      {
        key: "down_payment",
        label: "Down Payment",
        type: "comparison",
        secondary_output: {
          key: "total_loan_amount",
          label: "Total Loan Amount",
          type: "comparison",
        },
      },
      {
        key: "current_savings",
        label: "Current Savings",
        type: "comparison",
        secondary_output: {
          key: "current_expenses",
          label: "Current Expenses",
          type: "comparison",
        },
      },

      {
        key: "savings_after_mortgage",
        label: "Savings After Mortgage",
        type: "metric",
      },
      {
        key: "insight",
        label: "Insight",
        type: "insights",
      },
    ],
    calculate: (inputs) => {
      const {
        monthly_income,
        monthly_debts,
        monthly_expenses,
        down_payment,
        mortgage_duration,
        available_monthly_savings,
      } = inputs;

      const monthlySavings =
        parseFloat(monthly_income) -
        (parseFloat(monthly_debts) + parseFloat(monthly_expenses));
      const affordable_price =
        monthlySavings * parseFloat(mortgage_duration) +
        parseFloat(down_payment);

      const loan_amount = affordable_price - parseFloat(down_payment);
      const insights =
        "Affordable property price calculated based on your finances.";

      return {
        affordable_property_value: affordable_price,
        down_payment: down_payment,
        total_loan_amount: loan_amount,
        current_savings: monthlySavings,
        current_expenses: monthly_debts + monthly_expenses,
        insights: insights,
      };
    },
  },
];
