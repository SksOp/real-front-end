"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React, { useCallback, useEffect, useState } from "react";

function Progressbar({
  target,
  className,
}: {
  target: React.RefObject<HTMLElement>;
  className?: ClassValue;
}) {
  const [progress, setProgress] = useState(0);

  const scrollListener = useCallback(() => {
    if (!target.current) return;

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.screenY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (windowScrollTop === 0) return setProgress(0);

    if (windowScrollTop > totalHeight) return setProgress(100);

    setProgress((windowScrollTop / totalHeight) * 100);
  }, [target]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <div
      className={cn("w-full fixed top-[3.7rem] z-50 left-0 right-0", className)}
    >
      <div
        className="h-1 bg-gradient-to-r from-[rgba(86,129,235,1)] to-[rgba(211,103,116,1)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default Progressbar;
