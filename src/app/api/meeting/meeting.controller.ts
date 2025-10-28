import { NextResponse } from "next/server";
import { extractMeetingData } from "./meeting.service";
import { MeetingRequest } from "./meeting.types";

export async function handleMeetingRequest(req: Request) {
  try {
    const { transcript }: MeetingRequest = await req.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing transcript text." },
        { status: 400 }
      );
    }

    console.log("📥 Processing meeting transcript...");

    const result = await extractMeetingData(transcript);

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("handleMeetingRequest error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process meeting." },
      { status: 500 }
    );
  }
}
