import { Card } from "@/components/ui/card";

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  return (
    <Card className="p-6 shadow-elegant border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Summary</h2>
      <p className="text-foreground leading-relaxed text-base">
        {summary}
      </p>
    </Card>
  );
};
