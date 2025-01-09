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
    key: "broker-focused",
    title: "Broker Focused",
    description:
      "Tailored for real estate brokers, all the insights & utilities in one place for brokers.",

    avatar: <BrokerFocused />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    key: "complete-journey",
    title: "Complete Journey",
    description:
      "End to end real estate journey for agencies & brokers. Insights to conversion.",

    avatar: <CompleteJourney />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    key: "growth-oriented",
    title: "Growth Oriented",
    description:
      "Insights which puts the growth interest in you, your customer and seller. ",

    avatar: <GrowthOriented />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    key: "faster-advanced",
    title: "Faster & Advanced",
    description:
      "10x more features which are 50x faster compared to any other tools/apps.",

    avatar: <FasterIcon />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    key: "secure-compliant",
    title: "Secure & Compliant",
    description:
      "Fully compliant with local, and global GDPR laws. DLD licensed property tech firm.",

    avatar: <SecureIcon />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    key: "responsive",
    title: "Responsive",
    description:
      "Doesn't matter if you are using from desktop, phone or tablets, we have covered you all.",

    avatar: <ResponsiveIcon />,
    avatarBg: "bg-[#584DCB]",
  },
  {
    key: "customizable",
    title: "Customizable",
    description:
      "Customize the dashboards, metrics, branding and various other features.",

    avatar: <CustomizableIcon />,
    avatarBg: "bg-[#584DCB]",
  },
];
