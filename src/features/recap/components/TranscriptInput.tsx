import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface TranscriptInputProps {
  onGenerate: (transcript: string) => void;
  isLoading: boolean;
}

export const TranscriptInput = ({ onGenerate, isLoading }: TranscriptInputProps) => {
  const [transcript, setTranscript] = useState("");
  const charCount = transcript.length;

  const handleSubmit = () => {
    if (transcript.trim() && !isLoading) {
      onGenerate(transcript);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Meeting Transcript
        </label>
        <Textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your meeting transcript here..."
          className="min-h-[400px] resize-none input-bg border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          {charCount > 0 ? `${charCount} characters` : "Paste your meeting transcript. We'll extract the essentials."}
        </p>
      </div>
      
      <Button
        onClick={handleSubmit}
        disabled={!transcript.trim() || isLoading}
        className="w-full h-12 text-base font-medium"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Summary"
        )}
      </Button>
    </div>
  );
};
