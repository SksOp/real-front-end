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
  TeamIcon,
  TransactionsIcon,
} from "@/public/svg/home";
import { IntroCardProps } from "@/types/introcard";

export const HomeMatricsItems: IntroCardProps[] = [
  {
    title: "Dashboards",
    description:
      "Tailor your dashboard to track your focus areas with ease and precision.",
    linkto: "#",
    avatar: <DashboardsIcon />,
    avatarBg: "bg-[#F7CFB4]",
  },
  {
    title: "Calculators",
    description:
      "Share insights with colleagues, landlords, or customers to keep everyone in the loop.",
    linkto: "#",
    avatar: <CalculatorsIcon />,
    avatarBg: "bg-[#F8CBDB]",
  },
  {
    title: "Transaction",
    description:
      "Not just a raw transaction. Detailed insights for every transactions.",
    linkto: "#",
    avatar: <TransactionsIcon />,
    avatarBg: "bg-[#A6E5FF]",
  },
  {
    title: "Area Performance",
    description:
      "Compare the top performing area’s, both from sales and rental perspective.",
    linkto: "#",
    avatar: <AreaIcon />,
    avatarBg: "bg-[#F9F09D]",
  },
  {
    title: "Key Metrics",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "#",
    avatar: <KeyMatricsIcon />,
    avatarBg: "bg-[#DDDAF9]",
  },
  {
    title: "My Properties",
    description: "Browse from hundreds of projects listed with us.",
    linkto: "#",
    avatar: <MyPropertiesIcon />,
    avatarBg: "bg-[#F5D0FE]",
  },
];

export const HomeToolsItems: IntroCardProps[] = [
  {
    title: "Projects",
    description:
      "Tailor your dashboard to track your focus areas with ease and precision.",
    linkto: "#",
    avatar: <ProjectsIcon />,
    avatarBg: "bg-[#CBD5E1]",
  },
  {
    title: "Developers",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "#",
    avatar: <DevelopersIcon />,
    avatarBg: "bg-[#FECACA99]",
  },
  {
    title: "Leader board",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "#",
    avatar: <LeaderBoardIcon />,
    avatarBg: "bg-[#D9F99D]",
  },
  {
    title: "Map View",
    description:
      "Tailor your dashboard to track your focus areas with ease and precision.",
    linkto: "#",
    avatar: <MapViewIcon />,
    avatarBg: "bg-[#A7F3D0]",
  },
  {
    title: "AI Assistant",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "#",
    avatar: (
      <img src="/imgs/ai.svg" alt="ai" className="w-8 h-8 object-cover" />
    ),
  },
  {
    title: "Agent Portfolio",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "#",
    avatar: <AgentIcon />,
    avatarBg: "bg-[#BFDBFE]",
  },
];

export const HomeAgencyItems: IntroCardProps[] = [
  {
    title: "My Team & Colleagues",
    description:
      "Shared insights with everyone in the team. Better way to collaborate.",
    linkto: "#",
    avatar: <TeamIcon />,
    avatarBg: "bg-[#F5D0FE]",
  },
  {
    title: "REAL Drive",
    description:
      "Register for the daily market updates, insights delivered right to your inbox/whatsapp.",
    linkto: "#",
    avatar: <DriveIcon />,
    avatarBg: "bg-[#FED7AA]",
  },
  {
    title: "Daily Reports",
    description:
      "Browse through our expert agents profile with reviews and testimonials.",
    linkto: "#",
    avatar: <TransactionsIcon />,
    avatarBg: "bg-[#BAF1CA]",
  },
];
