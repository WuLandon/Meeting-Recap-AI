import { SummaryCard } from "@/features/recap/components/SummaryCard";
import { ActionItemsCard } from "@/features/recap/components/ActionItemsCard";
import { DecisionsCard } from "@/features/recap/components/DecisionsCard";
import { NextMeetingCard } from "@/features/recap/components/NextMeetingCard";
import { EmptyState } from "@/features/recap/components/EmptyState";
import { LoadingState } from "@/features/recap/components/LoadingState";
import type { MeetingOutput } from "@/shared/types/meeting.types";

interface ResultsPanelProps {
  data: MeetingOutput | null;
  isLoading: boolean;
}

export const ResultsPanel = ({ data, isLoading }: ResultsPanelProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!data) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SummaryCard summary={data.summary ?? ""} />
      <ActionItemsCard items={data.action_items ?? []} />
      <DecisionsCard decisions={data.decisions ?? []} />
      <NextMeetingCard nextMeeting={data.next_meeting ?? undefined} />
    </div>
  );
};
