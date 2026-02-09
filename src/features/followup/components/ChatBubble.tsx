import { Mail, MailOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatBubbleProps {
  onClick: () => void;
  isVisible: boolean;
  hasGeneratedEmail?: boolean;
}

export const ChatBubble = ({
  onClick,
  isVisible,
  hasGeneratedEmail,
}: ChatBubbleProps) => {
  if (!isVisible) return null;

  const buttonLabel = hasGeneratedEmail
    ? "Open Follow-Up Email"
    : "Write Follow-Up Email";
  const tooltipText = hasGeneratedEmail
    ? "Open existing follow-up draft."
    : "Use AI to draft your meeting follow-up email.";
  const ButtonIcon = Mail;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40 flex items-center justify-center"
          aria-label={buttonLabel}
        >
          <ButtonIcon className="w-6 h-6" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
