import { handleMeetingRequest } from "./meeting.controller";

const lastCall: Record<string, number> = {};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();

  // Simple rate limiter: 1 request per 10 seconds per IP
  if (lastCall[ip] && now - lastCall[ip] < 10000) {
    return new Response("Too many requests. Try again in a few seconds.", { status: 429 });
  }
  lastCall[ip] = now;

  return handleMeetingRequest(req);
}

export async function GET() {
  return new Response("Meeting API up and running");
}
