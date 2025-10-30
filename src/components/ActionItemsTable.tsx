import React from "react";

interface ActionItem {
  task: string;
  owner?: string | string[] | null;
  due?: string | null;
}

interface ActionItemsTableProps {
  items?: ActionItem[];
}

export default function ActionItemsTable({ items }: ActionItemsTableProps) {
  const hasItems = items && items.length > 0;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Action Items</h2>

      {hasItems ? (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Task</th>
              <th className="py-2">Owner</th>
              <th className="py-2">Due</th>
            </tr>
          </thead>
          <tbody>
            {items!.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 text-gray-700">{item.task}</td>
                <td className="py-2 text-gray-700">
                  {Array.isArray(item.owner)
                    ? item.owner.join(", ")
                    : item.owner || "—"}
                </td>
                <td className="py-2 text-gray-700">{item.due || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm italic">
          No action items were assigned in this meeting.
        </p>
      )}
    </div>
  );
}
