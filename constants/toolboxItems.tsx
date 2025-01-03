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
  linkto: string;
}

export const ToolboxItems: ToolboxItem[] = [
  {
    title: "Insights",
    svg: <InsightLogo />,
    linkto: "/app/dashboard",
  },
  {
    title: "Calculators",
    svg: <CalculatorLogo />,
    linkto: "/app/calculators",
  },
  {
    title: "Transactions",
    svg: <TransactionsLogo />,
    linkto: "/app/transactions",
  },
  {
    title: "My Properties",
    svg: <MyPropertiesLogo />,
    linkto: "/app/listings",
  },
  {
    title: "Developers",
    svg: <DevelopersLogo />,
    linkto: "/app/developers",
  },
  {
    title: "Projects",
    svg: <ProjectsLogo />,
    linkto: "/app/projects",
  },
  {
    title: "Key Metrics",
    svg: <KeyMatricsLogo />,
    linkto: "/app/key-metrics",
  },
  {
    title: "Market Pulse",
    svg: <MarketPulseLogo />,
    linkto: "/app/market-pulse",
  },
  {
    title: "Leaderboard",
    svg: <LeaderboardLogo />,
    linkto: "/app/leaderboard",
  },
  {
    title: "My Teams",
    svg: <TeamsLogo />,
    linkto: "/app/teams",
  },
  {
    title: "Real Drive",
    svg: <RealDriveLogo />,
    linkto: "/app/real-drive",
  },
  {
    title: "Daily Reports",
    svg: <ReportsLogo />,
    linkto: "/app/reports",
  },
  {
    title: "Map View",
    svg: <MapLogo />,
    linkto: "/app/map-view",
  },
  {
    title: "Ask AI",
    svg: <img src="/imgs/ai.svg" alt="ai" className="w-8 h-8 object-cover" />,
    linkto: "/app/ask-ai",
  },
  {
    title: "Agent Portfolio",
    svg: <AgentPortfolioLogo />,
    linkto: "/app/agent-portfolio",
  },
];
