import React from "react";

interface NextMeetingCardProps {
  nextMeeting: string | null;
}

export default function NextMeetingCard({ nextMeeting }: NextMeetingCardProps) {
  if (!nextMeeting) return null;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Next Meeting</h2>
      <p className="text-gray-700">{nextMeeting}</p>
    </div>
  );
}
