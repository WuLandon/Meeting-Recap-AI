import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

interface EmailAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  emailContent: string;
  onEmailChange: (content: string) => void;
}

export const EmailAssistantPanel = ({
  isOpen,
  onClose,
  emailContent,
  onEmailChange,
}: EmailAssistantPanelProps) => {
  const { toast } = useToast();
  const [localContent, setLocalContent] = useState(emailContent);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalContent(emailContent);
  }, [emailContent]);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Position window at bottom-right when opened
      const windowWidth = 560;
      const windowHeight = 420;
      setPosition({
        x: window.innerWidth - windowWidth - 32,
        y: window.innerHeight - windowHeight - 32,
      });
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localContent);
      toast({
        title: "Copied to clipboard",
        description: "Email content has been copied.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
    onEmailChange(e.target.value);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
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

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="fixed bg-background rounded-lg shadow-2xl border border-border z-50 flex flex-col"
      style={{
        width: '560px',
        height: '420px',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="drag-handle p-4 border-b border-border cursor-grab active:cursor-grabbing flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Follow-Up Email
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-accent rounded-md transition-colors"
          aria-label="Close window"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        <Textarea
          value={localContent}
          onChange={handleChange}
          className="min-h-[240px] resize-none text-sm leading-relaxed bg-background border-border focus:ring-2 focus:ring-primary"
          placeholder="Your AI-generated email will appear here..."
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex justify-end">
          <Button onClick={handleCopy}>
            Copy Email
          </Button>
        </div>
      </div>
    </div>
  );
};
