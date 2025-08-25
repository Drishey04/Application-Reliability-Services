// src/pages/Dashboard.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

const applications = [
  { name: "Case", incidents: { P1: 1, P2: 0, P3: 2, P4: 0, P5: 0 } },
  { name: "Atwork", incidents: { P1: 0, P2: 1, P3: 0, P4: 3, P5: 0 } },
  { name: "Etask", incidents: { P1: 0, P2: 0, P3: 1, P4: 0, P5: 0 } },
  { name: "Espa", incidents: { P1: 0, P2: 0, P3: 0, P4: 0, P5: 2 } },
  { name: "ProSuite", incidents: { P1: 2, P2: 1, P3: 0, P4: 0, P5: 0 } },
  { name: "Laas", incidents: { P1: 0, P2: 0, P3: 0, P4: 1, P5: 0 } },
];

const incidentColors = {
  P1: "bg-red-500 text-white",
  P2: "bg-orange-500 text-white",
  P3: "bg-yellow-400 text-black",
  P4: "bg-blue-400 text-white",
  P5: "bg-green-500 text-white",
};

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Application Diagnostics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            {/* Header */}
            <h3 className="text-xl font-semibold mb-4">{app.name}</h3>

            {/* Incidents Row (with top & bottom border) */}
            <div className="border-y border-gray-300 py-3">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Incidents
              </h4>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(app.incidents).map(([priority, count], j) => (
                  <span
                    key={j}
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      incidentColors[priority]
                    }`}
                  >
                    {priority}: {count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
