import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 text-gray-700">
      <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
      <p className="text-sm font-medium">Summarizing meeting...</p>
    </div>
  );
}