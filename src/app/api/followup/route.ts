import { handleFollowUpRequest } from "@/server/followup/followup.controller";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limited = rateLimit(req, { keyPrefix: "followup" });
  if (limited) return limited;

  return handleFollowUpRequest(req);
}

export async function GET() {
  return new Response("Follow-up API up and running");
}
