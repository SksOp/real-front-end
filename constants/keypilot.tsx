import {
  BrokerFocused,
  CompleteJourney,
  CustomizableIcon,
  FasterIcon,
  GrowthOriented,
  ResponsiveIcon,
  SecureIcon,
} from "@/public/svg/keypilot";
import { IntroCardProps } from "@/types/introcard";

export const KeypilotItems: IntroCardProps[] = [
  {
    title: "Broker Focused",
    description:
      "Tailored for real estate brokers, all the insights & utilities in one place for brokers.",
    linkto: "#",
    avatar: <BrokerFocused />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    title: "Complete Journey",
    description:
      "End to end real estate journey for agencies & brokers. Insights to conversion.",
    linkto: "#",
    avatar: <CompleteJourney />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    title: "Growth Oriented",
    description:
      "Insights which puts the growth interest in you, your customer and seller. ",
    linkto: "#",
    avatar: <GrowthOriented />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    title: "Faster & Advanced",
    description:
      "10x more features which are 50x faster compared to any other tools/apps.",
    linkto: "#",
    avatar: <FasterIcon />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    title: "Secure & Compliant",
    description:
      "Fully compliant with local, and global GDPR laws. DLD licensed property tech firm.",
    linkto: "#",
    avatar: <SecureIcon />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    title: "Responsive",
    description:
      "Doesn't matter if you are using from desktop, phone or tablets, we have covered you all.",
    linkto: "#",
    avatar: <ResponsiveIcon />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    title: "Customizable",
    description:
      "Customize the dashboards, metrics, branding and various other features.",
    linkto: "#",
    avatar: <CustomizableIcon />,
    avatarBg: "bg-[#584DCB]",
  },
];