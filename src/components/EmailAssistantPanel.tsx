import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    setLocalContent(emailContent);
  }, [emailContent]);

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

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[600px] max-w-[90vw] bg-muted/50 backdrop-blur-sm shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-border/50">
            <div className="flex items-start justify-between mb-2">
              <button
                onClick={onClose}
                className="p-2 -ml-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-1">
              Follow-Up Email
            </h2>
            <p className="text-sm text-muted-foreground">
              Generated based on your meeting summary
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8">
            <Textarea
              value={localContent}
              onChange={handleChange}
              className="min-h-[500px] resize-none font-mono text-sm leading-relaxed bg-background border-border focus:ring-2 focus:ring-primary"
              placeholder="Your AI-generated email will appear here..."
            />
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-border/50">
            <div className="flex justify-end">
              <Button onClick={handleCopy} size="lg">
                Copy Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
