import React from "react";

interface ActionItem {
  task: string;
  owner?: string | string[] | null;
  due?: string | null;
}

interface ActionItemsTableProps {
  items: ActionItem[];
}

export default function ActionItemsTable({ items }: ActionItemsTableProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white shadow-sm border rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Action Items</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Task</th>
            <th className="py-2">Owner</th>
            <th className="py-2">Due</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
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
    </div>
  );
}
