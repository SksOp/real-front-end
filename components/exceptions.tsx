import React from "react";
import { Button } from "./ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/public/svg/social";

/**
 * Exceptions Component
 *
 * This component displays exceptions with an SVG illustration, title, description,
 * and an optional button.
 *
 * @param svg The SVG illustration to display.
 * @param title The title of the exception.
 * @param description The description of the exception.
 * @param buttonText Optional text for the button. If provided, a button will be rendered.
 * @param onClick Optional callback function to handle button click.
 * @param className Optional additional CSS classes to apply to the component.
 *
 * @returns JSX Element representing the Exceptions component.
 *
 * @example
 * // Usage:
 * <Exceptions
 *   svg={<YourSvgComponent />}
 *   title="Exception Title"
 *   description="Exception Description"
 *   buttonText="Action"
 *   onClick={() => handleAction()}
 *   className="custom-class"
 * />
 */

interface ExceptionsProps {
  svg: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
  className?: ClassValue;
}

const Exceptions: React.FC<ExceptionsProps> = ({
  svg,
  title,
  description,
  buttonText,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn("flex items-center justify-center h-[79.9vh] ", className)}
    >
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">{svg}</div>
        <h1 className={cn("text-lg font-bold mb-2")}>{title}</h1>
        <h3 className={cn("text-sm mb-4 opacity-50")}>{description}</h3>
        {buttonText && (
          <Button
            variant="outline"
            className="text-base font-normal text-secondary gap-2 hover:bg-none"
          >
            <WhatsAppIcon className="w-5 h-5" />
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Exceptions;
