import React from "react";

interface SummaryCardProps {
  summary: string;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  if (!summary) return null;

  return (
    <div className="bg-white shadow-sm border rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Summary</h2>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
}
