"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { USE_MOCK } from "@/config/env";
import SplitLayout from "@/components/layout/SplitLayout";
import { generateMeetingSummary } from "@/api/meeting";
import type { MeetingOutput } from "@/app/api/meeting/meeting.types";
import SummaryCard from "@/components/SummaryCard";
import ActionItemsTable from "@/components/ActionItemsTable";
import UploadBox from "@/components/UploadBox";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";

export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeetingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    if (!USE_MOCK && !transcript.trim()) {
      setError("Please paste a meeting transcript before generating a summary.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const output = await generateMeetingSummary(transcript);
      if (!output || !output.summary) {
        setError("No summary could be generated. Try providing more transcript details.");
        return;
      }
      setResult(output);
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const leftContent = (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Meeting Recap AI</h1>
      <UploadBox
        transcript={transcript}
        loading={loading}
        onChange={setTranscript}
        onSubmit={handleSubmit}
      />
    </div>
  );

  const rightContent = (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {error && <ErrorMessage message={error} />}
      {!result && !loading && !error && <EmptyState />}

      <AnimatePresence mode="wait">
        {result && !error && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto flex flex-col gap-4"
          >
            <SummaryCard summary={result.summary} />
            <ActionItemsTable items={result.action_items} />
            {result.next_meeting && (
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Next Meeting</h2>
                <p className="text-gray-700">{result.next_meeting}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
