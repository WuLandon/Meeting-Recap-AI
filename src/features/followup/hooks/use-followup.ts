import { useCallback, useState } from "react";
import { generateFollowupEmail } from "@/client/api/followup";
import { useToast } from "@/hooks/use-toast";
import type { MeetingOutput } from "@/shared/types/meeting.types";

export function useFollowup() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [hasGeneratedEmail, setHasGeneratedEmail] = useState(false);
  const { toast } = useToast();

  const writeEmail = useCallback(
    async (meeting: MeetingOutput | null) => {
      if (!meeting || loading) return;

      setLoading(true);

      try {
        const email = await generateFollowupEmail(meeting);
        setEmailContent(email);
        setIsOpen(true);
        setHasGeneratedEmail(true);

        toast({
          title: "Follow-up email ready",
          description: "AI draft generated successfully.",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to generate follow-up email.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, toast],
  );

  const openPanel = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const reset = useCallback(() => {
    setHasGeneratedEmail(false);
    setEmailContent("");
  }, []);

  return {
    loading,
    isOpen,
    emailContent,
    hasGeneratedEmail,
    setEmailContent,
    writeEmail,
    openPanel,
    closePanel,
    reset,
  };
}
