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
    linkto: "/app/calculator",
  },
  {
    title: "Key Metrics",
    svg: <KeyMatricsLogo />,
    linkto: "/app/key-metrics",
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
    title: "Market Pulse",
    svg: <MarketPulseLogo />,
    linkto: "/app/market-pulse",
  },
  {
    title: "Transactions",
    svg: <TransactionsLogo />,
    linkto: "/app/transactions",
  },
  {
    title: "Leaderboard",
    svg: <LeaderboardLogo />,
    linkto: "/app/leaderboard",
  },
  {
    title: "My Teams",
    svg: <TeamsLogo />,
    linkto: "/app/my-teams",
  },
  {
    title: "Real Drive",
    svg: <RealDriveLogo />,
    linkto: "/app/real-drive",
  },
  {
    title: "Daily Reports",
    svg: <ReportsLogo />,
    linkto: "/app/daily-reports",
  },
  {
    title: "Map View",
    svg: <MapLogo />,
    linkto: "/app/map-view",
  },
  {
    title: "Ask AI",
    svg: (
      <img
        src="/imgs/ai.svg"
        alt="ai"
        className="w-8 h-8 object-cover animate-spin-slow"
      />
    ),
    linkto: "/app/ask-ai",
  },
  {
    title: "Agent Portfolio",
    svg: <AgentPortfolioLogo />,
    linkto: "/app/agent-portfolio",
  },
];
