import {
  AgentIcon,
  AreaIcon,
  CalculatorsIcon,
  DashboardsIcon,
  DevelopersIcon,
  DriveIcon,
  KeyMatricsIcon,
  LeaderBoardIcon,
  MapViewIcon,
  MyPropertiesIcon,
  ProjectsIcon,
  ReportsIcon,
  TeamIcon,
  TransactionsIcon,
} from "@/public/svg/home";
import { IntroCardProps } from "@/types/introcard";

export const HomeMatricsItems: IntroCardProps[] = [
  {
    key: "dashboard",
    title: "Dashboards",
    description:
      "Customizable dashboards tailored for Dubai’s property market insights and trends.",
    linkto: "/app/dashboards",
    avatar: <DashboardsIcon />,
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    key: "calculator",
    title: "Calculators",
    description:
      "Advanced calculators, AI estimators, and ROI tools for brokers in Dubai.",
    linkto: "/app/calculators",
    avatar: <CalculatorsIcon />,
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    key: "transactions",
    title: "Transaction",
    description:
      "Sales and rental transaction data with actionable, advanced market insights.",
    linkto: "/app/transactions",
    avatar: <TransactionsIcon />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    key: "market-pulse",
    title: "Area Performance",
    description:
      "Compare area performance with supply, demand, and growth trends.",
    linkto: "/app/market-pulse",
    avatar: <AreaIcon />,
    avatarBg: "bg-[#F9F09D]",
  },
  {
    key: "key-metrics",
    title: "Key Metrics",
    description:
      "Comprehensive view of Dubai property metrics, including advanced market data.",
    linkto: "/app/key-metrics",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
  },
  {
    key: "listings",
    title: "My Properties",
    description:
      "All your properties with AI-powered insights, accessible in one place.",
    linkto: "/app/listings",
    avatar: <MyPropertiesIcon />,
    avatarBg: "bg-[#F5D0FE]",
  },
];

export const HomeToolsItems: IntroCardProps[] = [
  {
    key: "projects",
    title: "Projects",
    description:
      "Explore past and future Dubai projects with timelines and progress tracking.",
    linkto: "/app/projects",
    avatar: <ProjectsIcon />,
    avatarBg: "bg-[#CBD5E1]",
  },
  {
    key: "developers",
    title: "Developers",
    description:
      "Details of all Dubai developers and their associated projects.",
    linkto: "/app/developers",
    avatar: <DevelopersIcon />,
    avatarBg: "bg-[#FECACA99]",
  },
  {
    key: "leaderboard",
    title: "Leader board",
    description:
      "Track your performance and actionable plans to join Dubai’s top brokers.",
    linkto: "/app/leaderboard",
    avatar: <LeaderBoardIcon />,
    avatarBg: "bg-[#D9F99D]",
  },
  {
    key: "map-view",
    title: "Map View",
    description:
      "Visualize property insights and analytics intuitively through a dynamic map.",
    linkto: "/app/map-view",
    avatar: <MapViewIcon />,
    avatarBg: "bg-[#A7F3D0]",
  },
  {
    key: "ask-ai",
    title: "AI Assistant",
    description:
      "Ask your AI-powered property expert anything about Dubai real estate.",
    linkto: "/app/ask-ai",
    avatar: (
      <img
        src="/imgs/ai.svg"
        alt="ai"
        className="w-8 h-8 object-cover animate-spin-slow"
      />
    ),
  },
  {
    key: "agent-portfolio",
    title: "Agent Portfolio",
    description:
      "Build an impressive, feature-rich real estate portfolio for customer success.",
    linkto: "/app/agent-portfolio",
    avatar: <AgentIcon />,
    avatarBg: "bg-[#BFDBFE]",
  },
];

export const HomeAgencyItems: IntroCardProps[] = [
  {
    key: "my-teams",
    title: "My Team & Colleagues",
    description:
      "Collaborate and manage your agency’s team with advanced tools.",
    linkto: "/app/my-teams",
    avatar: <TeamIcon />,
    avatarBg: "bg-[#F5D0FE]",
  },
  {
    key: "real-drive",
    title: "REAL Drive",
    description:
      "Centralize real estate documents and templates; store agency-specific files too.",
    linkto: "/app/real-drive",
    avatar: <DriveIcon />,
    avatarBg: "bg-[#FED7AA]",
  },
  {
    key: "daily-reports",
    title: "Daily Reports",
    description:
      "Custom dashboards and daily KPIs delivered to your inbox or WhatsApp.",
    linkto: "/app/daily-reports",
    avatar: <ReportsIcon />,
    avatarBg: "bg-[#BAF1CA]",
  },
];
