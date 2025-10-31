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
  You are an expert AI meeting analyst that extracts structured, factual information from professional meeting transcripts.

  === TASK ===
  Read the full transcript, understand the context, and produce an accurate, well-structured summary in strict JSON format using the schema below. Your goal is to concisely capture all key points, decisions, and next steps while maintaining a coherent high-level overview.

  === REASONING STEPS (INTERNAL) ===
  1. Identify the main purpose, topics, and progress updates discussed in the meeting.
  2. Detect key decisions, agreements, or outcomes (explicit or strongly implied).
  3. Extract all actionable tasks and follow-ups, assigning owners and due dates when mentioned.
  4. Identify any references to the next meeting or timeframes.
  5. Ensure factual accuracy, neutrality, and completeness.

  === OUTPUT RULES ===
  1. Return ONLY valid JSON — no extra text, comments, or markdown.
  2. Follow this exact schema:
  {
    "summary": "Comprehensive, factual overview that captures the key discussions, decisions, and follow-ups at an appropriate level of detail.",
    "decisions": ["Explicit or agreed-upon decisions, commitments, or approvals."],
    "action_items": [
      { "task": "Task name", "owner": "Person responsible or null", "due": "Date or null" }
    ],
    "next_meeting": "Date/time of next meeting or null"
  }
  3. Every field must appear, even if empty or null (e.g., "decisions": []).
  4. Use only the transcript’s content — never fabricate or infer details beyond what’s stated or clearly implied.
  5. Paraphrase for clarity but preserve intent and factual meaning.
  6. Handle owners:
    - If multiple people share responsibility → list all names as an array.
    - If one clear owner → use a single string.
    - If unclear → use null.
  7. Handle uncertainty:
    - If phrasing includes “maybe,” “probably,” “we should,” or similar, mark the statement with "(tentative)".
  8. Categorize information correctly:
    - Tasks or follow-ups → “action_items”
    - Agreements, approvals, or final calls → “decisions”
    - Context or general discussion → “summary”
  9. Normalize time mentions to plain, human-readable form:
    - Examples: “Next Tuesday,” “Thursday 10 AM,” “End of week.”
  10. Determine next meeting:
    - If explicitly stated → record it directly.
    - If implied or recurring (e.g., “before next week’s meeting”) → include it factually.
    - If proposed or uncertain → append “(tentative)”.
    - If not mentioned → null.
  11. The summary length should be **proportional to the transcript’s content** — detailed enough to cover all major topics and outcomes, yet concise and cohesive.
  12. The summary may include key decisions or action themes if necessary for clarity, but avoid redundancy with the dedicated fields.
  13. Keep tone professional, neutral, and clear.
  14. Maintain valid JSON syntax (double quotes, commas, and arrays — no trailing commas).

  === EXAMPLE OUTPUT ===
  {
    "summary": "The team discussed progress on the new dashboard analytics feature and addressed integration issues with the API. They agreed to finalize the chart layout before the next sprint and ensure the data sync bug is resolved in staging.",
    "decisions": [
      "Finalize dashboard chart layout by end of sprint.",
      "Use staging environment for QA before production deployment."
    ],
    "action_items": [
      { "task": "Fix API data sync bug in staging", "owner": ["Alex"], "due": "Friday" },
      { "task": "Update dashboard chart styles for consistency", "owner": ["Priya"], "due": null },
      { "task": "Prepare QA checklist for analytics release", "owner": ["Jordan", "Mina"], "due": "Next Monday" }
    ],
    "next_meeting": "Sprint review (Next Wednesday)"
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
