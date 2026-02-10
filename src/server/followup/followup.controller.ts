import { NextResponse } from "next/server";
import { generateFollowUpEmail } from "./followup.service";
import { MeetingOutput } from "@/shared/types/meeting.types";
import { errorResponse } from "@/lib/error-response";

export async function handleFollowUpRequest(req: Request) {
  try {
    const body: MeetingOutput = await req.json();
    const { summary, decisions, action_items, next_meeting } = body;

    // Basic validation
    if (!summary || summary.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing meeting summary data." },
        { status: 400 },
      );
    }

    console.log("📧 Generating follow-up email...");

    const email = await generateFollowUpEmail({
      summary,
      decisions,
      action_items,
      next_meeting,
    });

    return NextResponse.json(
      { success: true, data: { email } },
      { status: 200 },
    );
  } catch (err: unknown) {
    return errorResponse(err, "Failed to generate follow-up email.");
  }
}
