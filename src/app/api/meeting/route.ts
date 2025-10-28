import { handleMeetingRequest } from "./meeting.controller";

export async function POST(req: Request) {
  return handleMeetingRequest(req);
}

export async function GET() {
  return new Response("Meeting API up and running");
}
