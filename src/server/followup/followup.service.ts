import { GoogleGenAI } from "@google/genai";
import { MeetingOutput } from "@/shared/types/meeting.types";
import { systemPrompt } from "@/lib/system-prompts/followup";

const client = new GoogleGenAI({});

export async function generateFollowUpEmail(meeting: MeetingOutput): Promise<string> {
  const { summary, decisions, action_items, next_meeting } = meeting;

  if (!summary || summary.trim().length === 0) {
    throw new Error("Meeting summary cannot be empty.");
  }

  const messages = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "user",
      parts: [
        {
          text: `Meeting Data:\n${JSON.stringify(
            { summary, decisions, action_items, next_meeting },
            null,
            2
          )}`,
        },
      ],
    },
  ];

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages,
      config: { temperature: 0.3 },
    });

    const raw = response.text?.trim() ?? "";
    const cleaned = raw.replace(/```(email|text)?|```/g, "").trim();

    if (!cleaned) {
      throw new Error("Empty response from AI model.");
    }

    console.log("Follow-up email generated successfully.");
    return cleaned;
  } catch (err: unknown) {
    console.error("generateFollowUpEmail error details:", err);
    throw new Error("Failed to generate follow-up email.", { cause: err });
  }
}
