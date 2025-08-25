// src/pages/HealthStatus.jsx
import React, { useState } from "react";

const dummyData = [
  {
    name: "Case",
    url: "https://case.example.com",
    status: "healthy",
    responseTime: "245ms",
    lastChecked: "Aug 25, 2025 2:12 PM",
  },
  {
    name: "AtWork",
    url: "https://atwork.example.com",
    status: "warning",
    responseTime: "1,245ms",
    lastChecked: "Aug 25, 2025 2:12 PM",
  },
  {
    name: "ESPA",
    url: "https://espa.example.com",
    status: "critical",
    responseTime: "-",
    error: "Connection timeout",
    lastChecked: "Aug 25, 2025 2:12 PM",
  },
  {
    name: "ETask",
    url: "https://etask.example.com",
    status: "healthy",
    responseTime: "156ms",
    lastChecked: "Aug 25, 2025 2:12 PM",
  },
  {
    name: "ProSuite",
    url: "https://prosuite.example.com",
    status: "healthy",
    responseTime: "89ms",
    lastChecked: "Aug 25, 2025 2:12 PM",
  },
  {
    name: "LaaS",
    url: "https://laas.example.com",
    status: "healthy",
    responseTime: "312ms",
    lastChecked: "Aug 25, 2025 2:12 PM",
  },
];

const statusColors = {
  healthy: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  critical: "bg-red-100 text-red-700",
};

const statusIcons = {
  healthy: "✅",
  warning: "⚠️",
  critical: "🚨",
};

export default function HealthStatus() {
  const [apps, setApps] = useState(dummyData);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Health Status</h1>
          <p className="text-sm text-gray-500">
            Last checked: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={() => setApps([...dummyData])}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Refresh All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 border hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold">{app.name}</h2>
              <span className="text-xl">{statusIcons[app.status]}</span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">URL: </span>
              <a
                href={app.url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {app.url}
              </a>
            </p>

            <p className="text-sm mb-1">
              <span className="font-medium">Status: </span>
              <span
                className={`px-2 py-1 rounded-md text-xs ${statusColors[app.status]}`}
              >
                {app.status}
              </span>
            </p>

            <p className="text-sm mb-1">
              <span className="font-medium">Response Time: </span>
              {app.responseTime}
            </p>

            {app.error && (
              <p className="text-sm text-red-600 mb-1">
                <span className="font-medium">Error: </span> {app.error}
              </p>
            )}

            <p className="text-xs text-gray-500">
              <span className="font-medium">Last Checked: </span>
              {app.lastChecked}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
