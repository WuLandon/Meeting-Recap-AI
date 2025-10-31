import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface NextMeetingCardProps {
  nextMeeting?: string;
}

export const NextMeetingCard = ({ nextMeeting }: NextMeetingCardProps) => {
  return (
    <Card className="p-6 shadow-elegant border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Next Meeting</h2>
      {nextMeeting ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <span className="text-foreground font-medium">{nextMeeting}</span>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No upcoming meeting was scheduled.</p>
      )}
    </Card>
  );
};
