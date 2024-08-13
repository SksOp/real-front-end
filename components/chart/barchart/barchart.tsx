import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, TooltipProps } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

interface BarChartComponentProps {
  data: any; // You can make this more specific if you know the shape of your data
  xAxisDataKey?: string; // Key for XAxis data
  yAxisDataKey?: string; // Key for YAxis data (used by Bar)
  barColor?: string; // Color of the bars
  barRadius?: number; // Radius of the bar corners
  gridStroke?: string; // Stroke color of the grid
  tickColor?: string; // Color of the tick labels
  tickFontSize?: string; // Font size of the tick labels
  tickFormatter?: (value:any) => string; // Function to format tick labels
  tooltipContent?: React.ReactElement; // Custom tooltip content
  tickLine?: boolean; // Whether to show tick lines
  tickMargin?: number; // Margin for the ticks
  axisLine?: boolean; // Whether to show the axis line
  customBarProps?: Record<string, any>; // Additional props for the Bar component
  customXAxisProps?: Record<string, any>; // Additional props for the XAxis component
  customYAxisProps?: Record<string, any>; // Additional props for the YAxis component
  customGridProps?: Record<string, any>; // Additional props for the CartesianGrid component
  customTooltipProps?: Record<string, any>; // Additional props for the Tooltip component
}
                                                          
const Barchart: React.FC<BarChartComponentProps> = ({
  data,
  xAxisDataKey = "month", // Default dataKey for XAxis
  yAxisDataKey = "desktop", // Default dataKey for YAxis
  barColor = "#A9A1F4", // Default bar color
  barRadius = 8, // Default bar radius
  gridStroke = "#FFFFFF", // Default grid line color
  tickColor = "black", // Default tick color
  tickFontSize = "12px", // Default tick font size
  tickFormatter = (value) => value.slice(0, 3), // Default tick formatter
  tooltipContent = <Tooltip />, // Default t  ooltip component
  tickLine = false, // Default tick line visibility
  tickMargin = 10, // Default tick margin
  axisLine = false, // Default axis line visibility
  customBarProps = {}, // Additional custom props for the Bar component
  customXAxisProps = {}, // Additional custom props for the XAxis component
  customYAxisProps = {}, // Additional custom props for the YAxis component
  customGridProps = {}, // Additional custom props for the CartesianGrid component
  customTooltipProps = {}, // Additional custom props for the Tooltip component
}) => {

  console.log("data inside the barchart", data)
  // Custom tick rendering with customizable styles
  const customTickFormatter = (value: any) : string => {
    const result = tickFormatter(value);
    return result !== undefined ? result.toString() : '';
  };

  return (
    <BarChart data={data} width={300} height={300}>
      <CartesianGrid 
        vertical={false} 
        stroke={gridStroke} 
        {...customGridProps} // Apply custom grid props
      />
      <XAxis
        dataKey="month" // Customizable XAxis dataKey
        tickLine={tickLine} // Customizable tickLine
        tickMargin={tickMargin} // Customizable tickMargin
        axisLine={axisLine} // Customizable axisLine
        // tickFormatter={customTickFormatter} // Use the custom formatter with custom styles
        {...customXAxisProps} // Apply custom XAxis props
      />
      <Tooltip 
        content={tooltipContent} 
        {...customTooltipProps} // Apply custom Tooltip props
      />
      <Bar 
        dataKey="desktop" // Customizable dataKey
        fill={barColor} 
        radius={barRadius} 
        {...customBarProps} // Apply custom Bar props
      />
    </BarChart>
  );
};

export default Barchart;
