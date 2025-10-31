import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "group relative flex w-[2px] items-center justify-center bg-border/60 hover:bg-border transition-colors duration-200",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 after:cursor-col-resize",
      "data-[resize-handle-active]:bg-primary data-[resize-handle-active]:w-[2px]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "data-[panel-group-direction=vertical]:h-[2px] data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4",
      "data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2",
      "data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:cursor-row-resize",
      className,
    )}
    {...props}
  >
    <div className="z-10 flex h-10 w-6 items-center justify-center opacity-0 group-hover:opacity-100 group-data-[resize-handle-active]:opacity-100 transition-opacity duration-200">
      <div className="flex flex-col gap-1">
        <div className="w-1 h-1 rounded-full bg-muted-foreground/40 group-data-[resize-handle-active]:bg-primary" />
        <div className="w-1 h-1 rounded-full bg-muted-foreground/40 group-data-[resize-handle-active]:bg-primary" />
        <div className="w-1 h-1 rounded-full bg-muted-foreground/40 group-data-[resize-handle-active]:bg-primary" />
      </div>
    </div>
    {withHandle && (
      <GripVertical className="h-2.5 w-2.5" />
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
