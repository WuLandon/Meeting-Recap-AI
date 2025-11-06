import { USE_MOCK } from "@/config/env";
import { mockFollowupEmail } from "@/mocks/FollowupData";
import type { MeetingOutput } from "@/app/api/meeting/meeting.types";

export async function generateFollowupEmail(meetingData: MeetingOutput): Promise<string> {
  if (USE_MOCK) {
    console.log("Using mock follow-up email data");
    await new Promise((r) => setTimeout(r, 1000));
    return mockFollowupEmail;
  }

  const res = await fetch("/api/followup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: meetingData.summary,
      decisions: meetingData.decisions,
      actionItems: meetingData.action_items,
      nextMeeting: meetingData.next_meeting,
    }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to generate follow-up email.");

  return data.data.email;
}
