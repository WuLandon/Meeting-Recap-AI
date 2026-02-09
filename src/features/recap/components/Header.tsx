import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center gap-3 mb-8">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold text-foreground">Meeting Recap AI</h1>
    </header>
  );
};
