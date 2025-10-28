"use client";

import { useState } from "react";
import { generateMeetingSummary } from "@/api/meeting";
import type { MeetingOutput } from "@/app/api/meeting/meeting.types";
import SummaryCard from "@/components/SummaryCard";
import ActionItemsTable from "@/components/ActionItemsTable";
import UploadBox from "@/components/UploadBox";


export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeetingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const output = await generateMeetingSummary(transcript);
      setResult(output);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Meeting Recap AI</h1>

      <UploadBox
        transcript={transcript}
        loading={loading}
        onChange={setTranscript}
        onSubmit={handleSubmit}
      />

      {error && (
        <p className="text-red-600 mt-3 text-sm font-semibold">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 w-full max-w-xl flex flex-col gap-4">
          <SummaryCard summary={result.summary} />
          <ActionItemsTable items={result.action_items} />

          {result.next_meeting && (
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Next Meeting</h2>
              <p className="text-gray-700">{result.next_meeting}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
