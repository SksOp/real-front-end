import { ClassValue } from "clsx";

export interface IntroCardProps {
  key?: string;
  title: string;
  description: string;
  avatar: React.ReactNode;
  linkto: string;
  avatarBg?: ClassValue;
  soon?: boolean;
}
