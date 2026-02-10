import { GoogleGenAI } from "@google/genai";
import { MeetingOutput } from "@/shared/types/meeting.types";
import { systemPrompt } from "@/lib/system-prompts/meeting";

const client = new GoogleGenAI({});

/**
 * Extracts structured meeting data (summary, decisions, action items) from a transcript.
 */
export async function extractMeetingData(
  transcript: string,
): Promise<MeetingOutput> {
  if (!transcript || transcript.trim().length === 0) {
    throw new Error("Transcript cannot be empty.");
  }

  const messages = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "user",
      parts: [{ text: `Transcript:\n${transcript}` }],
    },
  ];

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages,
      config: { temperature: 0.2 },
    });

    const raw = response.text?.trim() ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed: MeetingOutput;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err: unknown) {
      console.error("Failed to parse JSON:", { cleaned, err });
      throw new Error("Invalid JSON from AI model.");
    }

    // Basic validation fallback
    return {
      summary: parsed.summary || "",
      decisions: parsed.decisions || [],
      action_items: parsed.action_items || [],
      next_meeting: parsed.next_meeting || null,
    };
  } catch (err: unknown) {
    console.error("extractMeetingData error details:", err);
    throw new Error("Failed to extract meeting data.", { cause: err });
  }
}
