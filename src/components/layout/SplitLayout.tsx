"use client";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { ReactNode } from "react";

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  defaultLeft?: number; // percent width
}

export default function SplitLayout({
  left,
  right,
  defaultLeft = 35,
}: SplitLayoutProps) {
  return (
    <PanelGroup direction="horizontal" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Left Panel */}
      <Panel
        defaultSize={defaultLeft}
        minSize={20}
        maxSize={60}
        className="p-6 border-r border-gray-200 overflow-y-auto"
      >
        {left}
      </Panel>

      {/* Handle */}
      <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize transition-colors" />

      {/* Right Panel */}
      <Panel className="flex-1 overflow-y-auto p-6">{right}</Panel>
    </PanelGroup>
  );
}
