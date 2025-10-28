export interface ActionItem {
  task: string;
  owner?: string;
  due?: string | null;
}

export interface MeetingOutput {
  summary: string;
  decisions: string[];
  action_items: ActionItem[];
  next_meeting?: string | null;
}

export interface MeetingRequest {
  transcript: string;
}