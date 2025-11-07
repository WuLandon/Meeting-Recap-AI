import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MailOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SummaryCardProps {
  summary: string;
  onWriteEmail?: () => void;
  hasGeneratedEmail?: boolean;
}

export const SummaryCard = ({ summary, onWriteEmail, hasGeneratedEmail }: SummaryCardProps) => {
  const buttonLabel = hasGeneratedEmail ? "Open Follow-Up Email" : "Write Follow-Up Email";
  const tooltipText = hasGeneratedEmail 
    ? "Open existing follow-up draft." 
    : "Use AI to draft your meeting follow-up email.";
  const ButtonIcon = hasGeneratedEmail ? MailOpen : Mail;
  
  return (
    <Card className="p-6 shadow-elegant border-border">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Summary</h2>
        {onWriteEmail && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onWriteEmail} size="sm" className="gap-2">
                <ButtonIcon className="w-4 h-4" />
                {buttonLabel}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <p className="text-foreground leading-relaxed text-base">
        {summary}
      </p>
    </Card>
  );
};
