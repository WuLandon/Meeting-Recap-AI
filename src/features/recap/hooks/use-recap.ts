import { useCallback, useState } from "react";
import { generateMeetingSummary } from "@/client/api/meeting";
import { USE_MOCK } from "@/lib/env";
import type { MeetingOutput } from "@/shared/types/meeting.types";
import { useToast } from "@/hooks/use-toast";

type UseRecapOptions = {
  onResetFollowup?: () => void;
};

export function useRecap(options: UseRecapOptions = {}) {
  const { onResetFollowup } = options;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeetingOutput | null>(null);
  const { toast } = useToast();

  const generate = useCallback(
    async (transcript: string) => {
      if (loading) return;

      if (!USE_MOCK && !transcript.trim()) {
        toast({
          title: "Missing Transcript",
          description:
            "Please paste a meeting transcript before generating a summary.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      setResult(null);
      onResetFollowup?.();

      try {
        const output = await generateMeetingSummary(transcript);

        if (!output || !output.summary) {
          toast({
            title: "No Summary Found",
            description: "Try providing more detailed transcript content.",
            variant: "destructive",
          });
          return;
        }

        setResult(output);

        toast({
          title: "Summary generated",
          description: "Your meeting recap is ready.",
        });
      } catch (err: unknown) {
        console.error("generateMeetingSummary failed:", err);
        toast({
          title: "Error",
          description: "Failed to generate summary. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, onResetFollowup, toast],
  );

  return { loading, result, generate };
}
