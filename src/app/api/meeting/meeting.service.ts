import { GoogleGenAI } from "@google/genai";
import { MeetingOutput } from "./meeting.types";


const client = new GoogleGenAI({});

/**
 * Extracts structured meeting data (summary, decisions, action items) from a transcript.
 */
export async function extractMeetingData(transcript: string): Promise<MeetingOutput> {
  if (!transcript || transcript.trim().length === 0) {
    throw new Error("Transcript cannot be empty.");
  }

  const systemPrompt = `
  You are an AI meeting summarizer that extracts structured, factual information from meeting transcripts.

  === TASK ===
  Analyze the transcript and produce a structured summary following the exact JSON schema below.

  === OUTPUT RULES ===
  1. Return ONLY valid JSON — no extra text, commentary, or markdown.
  2. Follow this schema exactly:
  {
    "summary": "Brief factual overview of the discussion.",
    "decisions": ["List of explicit or agreed-upon decisions."],
    "action_items": [
      { "task": "Task name", "owner": "Person responsible or null", "due": "Date or null" }
    ],
    "next_meeting": "Date/time of next meeting or null"
  }
  3. Every field must appear, even if null or empty (e.g., "decisions": []).
  4. Do NOT fabricate information not stated or implied in the transcript.
  5. Preserve factual accuracy — paraphrase for clarity but never invent content.
  6. If multiple owners are mentioned, list all of them explicitly as an array in the "owner" field.
    - Example: "owner": ["John", "Sarah"]
    - If a single owner is mentioned, use a string (e.g., "owner": "John").
    - If the owner is unclear, use null.
  7. If a statement is uncertain (e.g., “maybe,” “probably,” “need confirmation”), include it but clearly mark it as tentative using "(tentative)" or "(needs confirmation)".
  8. Capture implied goals, deliverables, or timeframes in the most appropriate field:
    - If phrased as a task → "action_items"
    - If phrased as a commitment or agreement → "decisions"
  9. For time-related mentions (e.g., “next week,” “tomorrow at 2 PM”), normalize into concise plain-text form where possible (e.g., "Next Tuesday 2 PM").
  10. For next meetings:
    - 10a. If a specific meeting time or day is explicitly stated, include it directly (e.g., "Thursday 10 AM").
    - 10b. If a next meeting is **implied but expected/recurring** (e.g., “before next week’s meeting”), treat it as confirmed and describe it factually (e.g., "Next week’s meeting").
    - 10c. If a next meeting is **proposed or uncertain** (e.g., “we should meet next week,” “let’s try to meet soon”), mark it as tentative using phrasing like "Next week (tentative)".
    - 10d. If no next meeting is mentioned or implied, set "next_meeting": null.
  11. Keep language concise, factual, and neutral — avoid speculation or commentary.
  12. Maintain consistent JSON formatting and double quotes around all keys and values.

  === EXAMPLE OUTPUT ===
  {
    "summary": "The team discussed the product launch delay and next steps.",
    "decisions": ["Postpone launch to next Friday."],
    "action_items": [
      { "task": "Notify beta users about delay", "owner": "John", "due": "Today" },
      { "task": "Update marketing assets", "owner": "Sarah", "due": "Tuesday" }
    ],
    "next_meeting": "Thursday 10 AM"
  }
  `;

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
    } catch (err) {
      console.error("⚠️ Failed to parse JSON:", cleaned);
      throw new Error("Invalid JSON from AI model.");
    }

    // Basic validation fallback
    return {
      summary: parsed.summary || "",
      decisions: parsed.decisions || [],
      action_items: parsed.action_items || [],
      next_meeting: parsed.next_meeting || null,
    };
  } catch (err: any) {
    console.error("❌ extractMeetingData error details:", err);
    throw new Error("Failed to extract meeting data.");
  }
}
