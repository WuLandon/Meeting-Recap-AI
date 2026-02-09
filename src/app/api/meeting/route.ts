import { handleMeetingRequest } from "@/server/meeting/meeting.controller";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limited = rateLimit(req, { keyPrefix: "meeting" });
  if (limited) return limited;

  return handleMeetingRequest(req);
}

export async function GET() {
  return new Response("Meeting API up and running");
}
