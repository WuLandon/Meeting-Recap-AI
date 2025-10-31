import { Card } from "@/components/ui/card";

interface DecisionsCardProps {
  decisions: string[];
}

export const DecisionsCard = ({ decisions }: DecisionsCardProps) => {
  return (
    <Card className="p-6 shadow-elegant border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Decisions</h2>
      {decisions.length === 0 ? (
        <p className="text-muted-foreground text-sm">No key decisions were made.</p>
      ) : (
        <ul className="space-y-3">
          {decisions.map((decision, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <span className="text-foreground leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
