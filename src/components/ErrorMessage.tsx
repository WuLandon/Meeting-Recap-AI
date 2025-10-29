import React from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mt-4 w-full max-w-xl bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
      <p className="font-medium">⚠️ {message}</p>
    </div>
  );
}
