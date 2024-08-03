"use client";

import { cn } from "@/lib/utils";

interface P extends React.ComponentProps<"div"> {
  currentTool: string;
}

export function ToolStatus(P: P) {
  console.log("P", P);

  return (
    <div
      className={cn(
        "flex items-center justify-end transition-opacity font-bold"
      )}
    >
      {P.currentTool}
    </div>
  );
}
