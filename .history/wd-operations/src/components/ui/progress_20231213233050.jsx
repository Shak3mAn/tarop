"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils/utils";

const Progress = React.forwardRef(({ className, value }, ref) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, []);
  React.useEffect(() => {
    if (!value) return; 

    setProgress(value);
  }, [value]);
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      value={progress}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary ease-in-out duration-1000 shadow-sm transition-all",
          progress <= 40 && "bg-red-800",
          progress > 40 && progress <= 75 && "bg-amber-600",
          progress > 75 && "bg-green-800",
          progress >= 95 && "bg-green-800 animate-pulse",
          progress > 100 && "bg-[#360505] animate-pulse"
        )}
        style={{ transform: `translateX(-${100 - (progress)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
