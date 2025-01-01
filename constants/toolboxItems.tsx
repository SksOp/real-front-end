import {
  InsightLogo,
  CalculatorLogo,
  TransactionsLogo,
  MyPropertiesLogo,
  DevelopersLogo,
  ProjectsLogo,
  KeyMatricsLogo,
  MarketPulseLogo,
  LeaderboardLogo,
  TeamsLogo,
  RealDriveLogo,
  ReportsLogo,
  MapLogo,
  AgentPortfolioLogo,
} from "@/public/svg/toolbox";

interface ToolboxItem {
  title: string;
  svg: React.ReactNode;
}

export const ToolboxItems: ToolboxItem[] = [
  {
    title: "Insights",
    svg: <InsightLogo />,
  },
  {
    title: "Calculators",
    svg: <CalculatorLogo />,
  },
  {
    title: "Transactions",
    svg: <TransactionsLogo />,
  },
  {
    title: "My Properties",
    svg: <MyPropertiesLogo />,
  },
  {
    title: "Developers",
    svg: <DevelopersLogo />,
  },
  {
    title: "Projects",
    svg: <ProjectsLogo />,
  },
  {
    title: "Key Metrics",
    svg: <KeyMatricsLogo />,
  },
  {
    title: "Market Pulse",
    svg: <MarketPulseLogo />,
  },
  {
    title: "Leaderboard",
    svg: <LeaderboardLogo />,
  },
  {
    title: "My Teams",
    svg: <TeamsLogo />,
  },
  {
    title: "Real Drive",
    svg: <RealDriveLogo />,
  },
  {
    title: "Daily Reports",
    svg: <ReportsLogo />,
  },
  {
    title: "Map View",
    svg: <MapLogo />,
  },
  {
    title: "Ask AI",
    svg: <img src="/imgs/ai.svg" alt="ai" className="w-8 h-8 object-cover" />,
  },
  {
    title: "Agent Portfolio",
    svg: <AgentPortfolioLogo />,
  },
];
