const isNumeric = (value: string) => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};
// Helper function to format the values
const FormatValue = (value: number | string) => {
  let numericValue: number;

  // If the value is a string and numeric, convert it to a number
  if (typeof value === "string" && isNumeric(value)) {
    numericValue = parseFloat(value);
  } else if (typeof value === "number") {
    numericValue = value;
  } else {
    return value; // If it's not numeric, return as is
  }

  // Format the numeric value
  if (numericValue >= 1_000_000_000) {
    return (numericValue / 1_000_000_000).toFixed(1) + "B";
  } else if (numericValue >= 1_000_000) {
    return (numericValue / 1_000_000).toFixed(1) + "M";
  } else if (numericValue >= 1_000) {
    return (numericValue / 1_000).toFixed(1) + "K";
  } else {
    return numericValue.toString(); // Return smaller numbers as is
  }
};

export { FormatValue };
