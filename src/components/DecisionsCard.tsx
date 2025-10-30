import React from "react";

interface DecisionsCardProps {
  decisions?: string[];
}

export default function DecisionsCard({ decisions }: DecisionsCardProps) {
  const hasDecisions = decisions && decisions.length > 0;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Decisions</h2>

      {hasDecisions ? (
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {decisions!.map((decision, index) => (
            <li key={index}>{decision}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">
          No decisions were recorded in this meeting.
        </p>
      )}
    </div>
  );
}
