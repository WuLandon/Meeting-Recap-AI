import { USE_MOCK } from "@/lib/env";
import { mockFollowupEmail } from "@/mocks/followup-data";
import type { MeetingOutput } from "@/shared/types/meeting.types";

export async function generateFollowupEmail(
  meetingData: MeetingOutput,
): Promise<string> {
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
      action_items: meetingData.action_items,
      next_meeting: meetingData.next_meeting,
    }),
  });

  const data = await res.json();
  if (!data.success)
    throw new Error(data.error || "Failed to generate follow-up email.");

  return data.data.email;
}
