"use client";

import { useRecap } from "@/features/recap/hooks/use-recap";
import { useFollowup } from "@/features/followup/hooks/use-followup";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Header } from "../features/recap/components/Header";
import { TranscriptInput } from "../features/recap/components/TranscriptInput";
import { ResultsPanel } from "@/features/recap/components/ResultsPanel";
import { EmailAssistantPanel } from "@/features/followup/components/EmailAssistantPanel";
import { ChatBubble } from "@/features/followup/components/ChatBubble";

export default function HomePage() {
  const followup = useFollowup();
  const recap = useRecap({
    onResetFollowup: followup.reset,
  });
  const isLoading = recap.loading || followup.loading;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        {/* Mobile view */}
        <div className="lg:hidden space-y-8">
          <div className="panel-bg rounded-3xl p-6 shadow-subtle">
            <Header />
            <TranscriptInput
              onGenerate={recap.generate}
              isLoading={isLoading}
            />
          </div>
          <div>
            <ResultsPanel data={recap.result} isLoading={isLoading} />
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
                  onGenerate={recap.generate}
                  isLoading={isLoading}
                />
              </div>
            </ResizablePanel>

            {/* Divider */}
            <ResizableHandle />

            {/* Right Panel */}
            <ResizablePanel defaultSize={60} minSize={40} maxSize={75}>
              <div className="overflow-y-auto h-full ml-4">
                <ResultsPanel data={recap.result} isLoading={isLoading} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Chat Bubble */}
        <ChatBubble
          onClick={
            followup.hasGeneratedEmail
              ? followup.openPanel
              : () => followup.writeEmail(recap.result)
          }
          isVisible={!!recap.result}
          hasGeneratedEmail={followup.hasGeneratedEmail}
        />

        {/* Email Assistant Window */}
        <EmailAssistantPanel
          isOpen={followup.isOpen}
          onClose={followup.closePanel}
          emailContent={followup.emailContent}
          onEmailChange={followup.setEmailContent}
        />
      </div>
    </div>
  );
}
