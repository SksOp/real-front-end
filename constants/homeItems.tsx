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
      "Tailor your dashboard to track your focus areas with ease and precision.",
    linkto: "/app/dashboard",
    avatar: <DashboardsIcon />,
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    key: "calculator",
    title: "Calculators",
    description:
      "Share insights with colleagues, landlords, or customers to keep everyone in the loop.",
    linkto: "/app/calculator",
    avatar: <CalculatorsIcon />,
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    key: "transactions",
    title: "Transaction",
    description:
      "Not just a raw transaction. Detailed insights for every transactions.",
    linkto: "/app/transactions",
    avatar: <TransactionsIcon />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    key: "market-pulse",
    title: "Area Performance",
    description:
      "Compare the top performing area’s, both from sales and rental perspective.",
    linkto: "/app/market-pulse",
    avatar: <AreaIcon />,
    avatarBg: "bg-[#F9F09D]",
  },
  {
    key: "key-metrics",
    title: "Key Metrics",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "/app/key-metrics",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
  },
  {
    key: "listings",
    title: "My Properties",
    description: "Browse from hundreds of projects listed with us.",
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
      "Tailor your dashboard to track your focus areas with ease and precision.",
    linkto: "/app/projects",
    avatar: <ProjectsIcon />,
    avatarBg: "bg-[#CBD5E1]",
  },
  {
    key: "developers",
    title: "Developers",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "/app/developers",
    avatar: <DevelopersIcon />,
    avatarBg: "bg-[#FECACA99]",
  },
  {
    key: "leaderboard",
    title: "Leader board",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "/app/leaderboard",
    avatar: <LeaderBoardIcon />,
    avatarBg: "bg-[#D9F99D]",
  },
  {
    key: "map-view",
    title: "Map View",
    description:
      "Tailor your dashboard to track your focus areas with ease and precision.",
    linkto: "/app/map-view",
    avatar: <MapViewIcon />,
    avatarBg: "bg-[#A7F3D0]",
  },
  {
    key: "ask-ai",
    title: "AI Assistant",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
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
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
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
      "Shared insights with everyone in the team. Better way to collaborate.",
    linkto: "/app/my-teams",
    avatar: <TeamIcon />,
    avatarBg: "bg-[#F5D0FE]",
  },
  {
    key: "real-drive",
    title: "REAL Drive",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "/app/real-drive",
    avatar: <DriveIcon />,
    avatarBg: "bg-[#FED7AA]",
  },
  {
    key: "daily-reports",
    title: "Daily Reports",
    description:
      "Browse through our expert agents profile with reviews and testimonials.",
    linkto: "/app/daily-reports",
    avatar: <ReportsIcon />,
    avatarBg: "bg-[#BAF1CA]",
  },
];
