import { FileText } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-6">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No results yet
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Paste a transcript to get started. We'll automatically extract summaries, action items, decisions, and more.
      </p>
    </div>
  );
};
