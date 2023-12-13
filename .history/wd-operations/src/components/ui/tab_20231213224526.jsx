"use client";

import * as React from "react";
import * as TabPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils/utils";

const Tabs = TabPrimitive.Root;

const TabsTrigger = TabPrimitive.TabsTrigger;

const TabsContent = React.forwardRef(
  ({ className, children, value, ...props }, ref) => {
    return (
      <TabPrimitive.Content
        ref={ref}
        className={cn(
          "grid w-full gap-4 bg-background",
          className
        )}
        value={value}
        {...props}
      >
        {children}
      </TabPrimitive.Content>
    );
  }
);
TabContent.displayName = TabPrimitive.Content.displayName

export {
    Tabs,
  TabsTrigger,
  TabsContent
}