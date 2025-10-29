"use client";
import React from "react";

interface UploadBoxProps {
  transcript: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UploadBox({ transcript, loading, onChange, onSubmit }: UploadBoxProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl flex flex-col gap-3">
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 h-40 resize-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white font-medium rounded-lg py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Summarizing..." : "Generate Summary"}
      </button>
    </form>
  );
}
