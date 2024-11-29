"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            // Define switch background based on its state
            "data-[state=checked]:bg-primary-light data-[state=unchecked]:bg-gray-600",
            className
        )}
        {...props}
        ref={ref}
    >
      <SwitchPrimitives.Thumb
          className={cn(
              "pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform",
              // Define thumb background and position based on its state
              "data-[state=checked]:bg-primary-default data-[state=checked]:translate-x-4",
              "data-[state=unchecked]:bg-grey-100 data-[state=unchecked]:translate-x-0"
          )}
      />
    </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };