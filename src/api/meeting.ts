import { MeetingOutput } from "@/app/api/meeting/meeting.types";

export async function generateMeetingSummary(transcript: string): Promise<MeetingOutput> {
  const res = await fetch("/api/meeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to process meeting.");

  return data.data;
}
