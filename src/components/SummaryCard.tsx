import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SummaryCardProps {
  summary: string;
  onWriteEmail?: () => void;
}

export const SummaryCard = ({ summary, onWriteEmail }: SummaryCardProps) => {
  return (
    <Card className="p-6 shadow-elegant border-border">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Summary</h2>
        {onWriteEmail && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onWriteEmail} size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                Write Follow-Up Email
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use AI to draft your meeting follow-up email.</p>
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
