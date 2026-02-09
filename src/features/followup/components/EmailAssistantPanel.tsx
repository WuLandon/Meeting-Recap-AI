import { X, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface EmailAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  emailContent: string;
  onEmailChange: (content: string) => void;
}

const WINDOW_WIDTH = 560;
const WINDOW_HEIGHT = 420;
const MARGIN = 32;

export const EmailAssistantPanel = ({
  isOpen,
  onClose,
  emailContent,
  onEmailChange,
}: EmailAssistantPanelProps) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    return {
      x: window.innerWidth - WINDOW_WIDTH - MARGIN,
      y: window.innerHeight - WINDOW_HEIGHT - MARGIN,
    };
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailContent);
      toast({
        title: "Copied to clipboard",
        description: "Email content has been copied.",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onEmailChange(e.target.value);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".drag-handle")) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="fixed bg-panel-surface rounded-lg shadow-elevated border border-panel-border-strong overflow-hidden z-50 flex flex-col"
      style={{
        width: `${WINDOW_WIDTH}px`,
        height: `${WINDOW_HEIGHT}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="drag-handle p-2.5 bg-panel-header text-panel-header-foreground border-b border-panel-divider cursor-grab active:cursor-grabbing flex items-center justify-between">
        <h2 className="text-base font-semibold">Follow-Up Email</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md transition-colors"
          aria-label="Close window"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 p-3">
        <Textarea
          value={emailContent}
          onChange={handleChange}
          className="w-full h-full resize-none text-sm leading-relaxed bg-panel-textarea border border-panel-border-strong rounded-md focus:ring-2 focus:ring-primary transition-colors"
          placeholder="Your AI-generated email will appear here..."
        />
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-panel-footer border-t border-panel-divider flex justify-end items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              aria-label="Copy email"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" align="end">
            Copy Email
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
