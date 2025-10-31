import { SummaryCard } from "./SummaryCard";
import { ActionItemsCard } from "./ActionItemsCard";
import { DecisionsCard } from "./DecisionsCard";
import { NextMeetingCard } from "./NextMeetingCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import type { MeetingOutput } from "@/app/api/meeting/meeting.types";


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
