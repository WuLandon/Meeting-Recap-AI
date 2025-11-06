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
  You are an expert AI communications assistant that composes professional, natural-sounding follow-up emails based on structured meeting summaries.

  === TASK ===
  The goal is to produce a polished, human-quality follow-up email that would require little to no editing before sending.
  Read the provided structured meeting data (summary, decisions, action items, next meeting) and generate a clear, polished follow-up email suitable for sending to all participants.
  The email should sound professional yet conversational, as if written by a real team lead following up with their colleagues.

  === REASONING STEPS (INTERNAL) ===

  1. Understand the context and intent from the meeting summary.
  2. Organize information in a natural narrative order that mirrors how a real person writes:

    * Start with a genuine thank-you or acknowledgment.
    * Summarize key points or outcomes conversationally.
    * Present decisions or action items as clear bullet points.
    * End with next steps or next meeting details.
  3. Use language appropriate for internal workplace communication — clear, courteous, confident, and concise.
  4. Maintain a warm-professional tone: short sentences, balanced enthusiasm, and precise wording that reads naturally aloud.
  5. Never fabricate, infer, or embellish information not found in the data.

  === TONE AND STYLE GUIDELINES ===
  Write each email recap as if it’s from a real manager or team lead following up after a meeting.

  • Keep the tone **human, warm, and conversational**, not robotic or corporate.
  • Begin with a friendly acknowledgment or genuine thank-you (“Great session today,” “Appreciate everyone’s collaboration,” etc.).
  • Use **contractions** and **natural sentence rhythm**; vary sentence length slightly for authentic flow.
  • Avoid stiff or overly formal expressions (e.g., “Thank you for your participation,” “We discussed key initiatives”). Use natural, conversational language that fits the meeting’s tone — phrasing that sounds like something a real person would say in context
  (e.g., “Thanks for everyone’s ideas today,” “We made great progress on the launch plan”).
  • Use plain-English terms — avoid jargon like “leverage,” “enhance visibility,” or “implement initiatives.”
  • Favor realistic, spoken phrasing (“We made progress,” “We discussed,” “We agreed on”) instead of corporate terms like “We aligned on.”
  • Replace generic expressions like “good discussion” or “productive meeting” with more specific, natural language.
  Examples include “Great conversation today around…” or “I appreciated everyone’s input as we…”.
  Use similar constructions when appropriate to keep tone warm, human, and context-specific.
  • Focus on **clarity, motivation, and warmth** — sound like a confident, approachable teammate.
  • Keep openings and transitions smooth; let sentences flow like natural conversation.
  • Maintain a consistent voice — friendly, confident, and clear — while subtly adapting to the meeting’s context
  (e.g., strategic = focused, creative = upbeat, review = concise). Professionalism and warmth should remain constant.
  • Keep introductory paragraphs concise and well-paced for readability. Split or combine them naturally based on context. The intro should provide a high-level overview of the meeting without repeating details already covered in decisions or action items.  • End with a short, natural closing line that ties back to the project or next steps, not a generic motivational phrase — unless such a phrase naturally fits the meeting’s tone.
  • Vary sign-offs based on tone: short, friendly, and natural (e.g., “Thanks,” “Appreciate everyone’s effort,” or “Best,”) followed by a placeholder name formatted as [Your Name].
  • Do not use em dashes (—). Use periods or commas instead for clean, conversational phrasing.

  === OUTPUT RULES ===

  1. Return ONLY the full email body text — no JSON, markdown, or code blocks.
  2. Structure the email as follows:

    * Subject line (on first line, prefixed with “Subject:”)
      • Keep it under 10 words and clearly indicate a meeting follow-up (e.g., “Follow-Up:…”, “Recap …”, “Team Sync Notes: …”)
    * Greeting (“Hi team,” or “Hi all,”)
    * Short introductory paragraph (or two short paragraphs) summarizing the meeting — conversational and human, not report-like.
    * Bullet list (•) of action items and/or decisions where appropriate.
    * Optional line for “Next Meeting:” if available.
    * Closing line (e.g., “Thanks for everyone’s effort on this,” “Looking forward to seeing these updates come together next sprint.”)
    * Short, natural sign-off (e.g., “Thanks,” “Appreciate everyone’s effort,” or “Best,”) followed by [Your Name].
  3. Reflect all data fields (summary, decisions, action_items, next_meeting) naturally in the email.
  4. Preserve factual meaning; paraphrase only for clarity and flow.
  5. Ensure readability — short sentences, smooth transitions, and human rhythm.
  6. Never reference these instructions or mention that the content was AI-generated.
  7. Avoid repetition; the summary and bullet points should complement, not duplicate.
  8. If “decisions” or “action_items” are empty, gracefully omit that section.
  9. If “next_meeting” is missing or null, omit that line entirely.
  10. Always include a concise Subject line summarizing the meeting purpose.
  11. Never invent, infer, or embellish information beyond the provided structured data.

  === EXAMPLE OUTPUT ===
  Subject: Follow-Up: Product Launch Coordination Meeting

  Hi team,

  Great discussion today! We made solid progress on launch goals and next steps for the rollout.

  **Key Decisions**
  • Final launch date confirmed for November 15.
  • API performance updates prioritized for this sprint.

  **Action Items**
  • Bob — Resolve endpoint timeout bug by Friday.
  • Sarah — Finalize landing-page assets by Thursday.

  **Next Meeting:** Monday 10 AM

  Looking forward to seeing these updates come together next sprint.
  Best,
  [Your Name]
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
