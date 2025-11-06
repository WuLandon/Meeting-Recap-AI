"use client";

import { useState } from "react";
import { generateMeetingSummary } from "@/services/meeting";
import { generateFollowupEmail } from "@/services/followup";
import { USE_MOCK } from "@/config/env";
import type { MeetingOutput } from "@/app/api/meeting/meeting.types";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Header } from "@/components/Header";
import { TranscriptInput } from "@/components/TranscriptInput";
import { ResultsPanel } from "@/components/ResultsPanel";
import { EmailAssistantPanel } from "@/components/EmailAssistantPanel";

export default function HomePage() {
  const [loading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MeetingOutput | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const { toast } = useToast();

  async function handleGenerate(transcript: string) {
    if (loading) return;

    if (!USE_MOCK && !transcript.trim()) {
      toast({
        title: "Missing Transcript",
        description: "Please paste a meeting transcript before generating a summary.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const output = await generateMeetingSummary(transcript);

      if (!output || !output.summary) {
        toast({
          title: "No Summary Found",
          description: "Try providing more detailed transcript content.",
          variant: "destructive",
        });
        return;
      }

      setTimeout(() => {
        setResult(output);
        toast({
          title: "Summary generated",
          description: "Your meeting recap is ready.",
        });
      }, 300);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }

  const handleWriteEmail = async () => {
    if (!result) return;

    setIsLoading(true);

    try {
      const email = await generateFollowupEmail(result);
      setEmailContent(email);
      setIsPanelOpen(true);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        {/* Mobile view */}
        <div className="lg:hidden space-y-8">
          <div className="panel-bg rounded-3xl p-6 shadow-subtle">
            <Header />
            <TranscriptInput
              onGenerate={handleGenerate}
              isLoading={loading}
            />
          </div>
          <div>
            <ResultsPanel 
              data={result} 
              isLoading={loading}
              onWriteEmail={result ? handleWriteEmail : undefined}
            />
          </div>
        </div>

        {/* Desktop: Two-panel layout */}
        <div className="hidden lg:block h-[calc(100vh-4rem)]">
          <ResizablePanelGroup direction="horizontal" className="gap-0">
            {/* Left Panel */}
            <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
              <div className="panel-bg rounded-3xl p-8 shadow-subtle overflow-y-auto h-full mr-4">
                <Header />
                <TranscriptInput
                  onGenerate={handleGenerate}
                  isLoading={loading}
                />
              </div>
            </ResizablePanel>

            {/* Divider */}
            <ResizableHandle />

            {/* Right Panel */}
            <ResizablePanel defaultSize={60} minSize={40} maxSize={75}>
              <div className="overflow-y-auto h-full ml-4">
                <ResultsPanel 
                  data={result} 
                  isLoading={loading}
                  onWriteEmail={result ? handleWriteEmail : undefined}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        {/* Email Assistant Panel */}
        <EmailAssistantPanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          emailContent={emailContent}
          onEmailChange={setEmailContent}
        />
      </div>
    </div>
  );
}
