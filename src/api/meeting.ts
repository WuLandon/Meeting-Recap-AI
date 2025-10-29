import { MeetingOutput } from "@/app/api/meeting/meeting.types";
import { mockMeetingData } from "@/mocks/MeetingData";
import { USE_MOCK } from "@/config/env";

export async function generateMeetingSummary(transcript: string): Promise<MeetingOutput> {
  if (USE_MOCK) {
    console.log("⚙️ Using mock meeting data");
    await new Promise((r) => setTimeout(r, 1000));
    return mockMeetingData;
  }    

  const res = await fetch("/api/meeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to process meeting.");

  return data.data;
}
