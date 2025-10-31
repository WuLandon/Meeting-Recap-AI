import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ActionItem } from "@/app/api/meeting/meeting.types";


interface ActionItemsCardProps {
  items: ActionItem[];
}

export const ActionItemsCard = ({ items }: ActionItemsCardProps) => {
  return (
    <Card className="p-6 shadow-elegant border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Action Items</h2>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No action items were assigned.</p>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Task</TableHead>
                <TableHead className="font-semibold">Owner</TableHead>
                <TableHead className="font-semibold">Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.task}</TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell className="text-muted-foreground">{item.due || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
};
