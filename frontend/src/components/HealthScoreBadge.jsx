import React from "react";

export default function HealthScoreBadge({ status }) {
  const map = {
    healthy: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    critical: "bg-red-100 text-red-700 border-red-200",
    unknown: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-md border ${map[status] || map.unknown}`}>
      {status}
    </span>
  );
}
