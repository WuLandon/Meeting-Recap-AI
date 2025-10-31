import { MeetingOutput } from "@/app/api/meeting/meeting.types";

export const mockMeetingData: MeetingOutput = {
  summary:
    "The team discussed upcoming marketing strategies and finalized the new campaign launch date.",
  decisions: [
    "Finalize campaign assets by Friday",
    "Begin social rollout on Monday",
  ],
  action_items: [
    { task: "Design final assets", owner: "Sarah", due: "Friday" },
    { task: "Prepare email templates", owner: "John", due: "Monday" },
  ],
  next_meeting: "Next Tuesday 11 AM",
};

// export const mockMeetingData: MeetingOutput = {
//   summary:
//     "The team discussed upcoming marketing strategies and finalized the new campaign launch date.",
//   decisions: [],
//   action_items: [],
//   next_meeting: ""
// };
