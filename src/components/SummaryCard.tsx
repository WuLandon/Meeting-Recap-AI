import { Card } from "@/components/ui/card";

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  return (
    <Card className="p-6 shadow-elegant border-border">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Summary</h2>
      </div>
      <p className="text-foreground leading-relaxed text-base">
        {summary}
      </p>
    </Card>
  );
};
