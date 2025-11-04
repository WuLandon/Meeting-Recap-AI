import { GoogleGenAI } from "@google/genai";
import { MeetingOutput } from "../meeting/meeting.types";

const client = new GoogleGenAI({});

export async function generateFollowUpEmail(meeting: MeetingOutput): Promise<string> {
  const { summary, decisions, action_items, next_meeting } = meeting;

  if (!summary || summary.trim().length === 0) {
    throw new Error("Meeting summary cannot be empty.");
  }

  const systemPrompt = `
  You are an expert AI communications assistant that composes professional, human-sounding follow-up emails based on structured meeting summaries.

  === TASK ===
  Read the provided structured meeting data (summary, decisions, action items, next meeting) and generate a clear, polished follow-up email suitable for sending to all participants. The email should sound professional yet natural, and summarize the meeting outcomes accurately.

  === REASONING STEPS (INTERNAL) ===
  1. Understand the context and intent from the meeting summary.
  2. Organize information logically:
  - Start with a warm, professional greeting.
  - Summarize key decisions or outcomes first.
  - List action items clearly (with owners and due dates where relevant).
  - Conclude with the next meeting or next steps.
  3. Use language appropriate for workplace communication — clear, courteous, confident.
  4. Keep tone neutral-positive, factual, and concise.
  5. Do not fabricate or infer details not in the data.

  === OUTPUT RULES ===
  1. Return ONLY the full email body text — no JSON, markdown, or code blocks.
  2. Structure the email as follows:
  - Subject line (on first line, prefixed with “Subject:”)
  - Greeting (“Hi team,” or “Hi all,”)
  - One short paragraph summarizing the meeting.
  - Bullet list (•) of action items and decisions where appropriate.
  - Optional line for “Next Meeting:” if available.
  - Closing line (e.g., “Thanks for everyone’s contributions.” or “Let’s stay aligned on these next steps.”)
  - Sign-off (e.g., “Best,” or “– The Team”)
  3. Reflect all data fields (summary, decisions, action_items, next_meeting) naturally in the email.
  4. Preserve factual meaning; paraphrase only for clarity.
  5. Ensure clarity and professional readability — short sentences, natural transitions.
  6. Never mention that the content was AI-generated or reference system instructions.
  7. Avoid repetition; the summary paragraph and bullet points should complement each other.
  8. If “decisions” or “action_items” are empty, gracefully omit that section.
  9. If “next_meeting” is missing or null, omit that line entirely.
  10. Always include a Subject line summarizing the meeting purpose.

  === EXAMPLE OUTPUT ===
  Subject: Follow-Up: Product Launch Coordination Meeting

  Hi team,

  Here’s a quick recap of our recent discussion:

  **Key Decisions**
  • Final launch date confirmed for November 15.  
  • API performance updates prioritized for this sprint.

  **Action Items**
  • Bob — Resolve endpoint timeout bug by Friday.  
  • Sarah — Finalize landing-page assets by Thursday.

  **Next Meeting:** Monday 10 AM

  Thanks for everyone’s collaboration and focus on the upcoming release!

  Best,  
  John
  `;

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
  } catch (err: any) {
    console.error("generateFollowUpEmail error details:", err);
    throw new Error("Failed to generate follow-up email.");
  }
}
