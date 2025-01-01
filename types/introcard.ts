import { ClassValue } from "clsx";

export interface IntroCardProps {
  title: string;
  description: string;
  avatar: React.ReactNode;
  linkto: string;
  avatarBg: ClassValue;
  soon?: boolean;
}
