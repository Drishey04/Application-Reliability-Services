// src/pages/HealthStatus.jsx
import React, { useState } from "react";
import {
  Cpu,
  Activity,
  MemoryStick,
  Server,
  ClipboardList,
  Eye,
  FileText,
} from "lucide-react";

const applications = ["Case", "Atwork", "Etask", "Espa", "ProSuite", "Laas"];

const dummyMetrics = {
  cpu: "65%",
  memory: "72%",
  ram: "8 GB / 16 GB",
  processes: 123,
};

const dummyChanges = [
  { id: 1, change: "Database schema update", date: "2025-09-02" },
  { id: 2, change: "API Gateway upgrade", date: "2025-09-10" },
];

const monitoringSetup = [
  { tool: "Prometheus", status: "Active" },
  { tool: "ThousandEyes", status: "Active" },
  { tool: "Splunk - Logs", status: "Active" },
  { tool: "Splunk - Metrics", status: "Active" },
];

export default function HealthStatus() {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <div className="p-6">
      {!selectedApp ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Health Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedApp(app)}
              >
                <h3 className="text-xl font-semibold">{app}</h3>
                <p className="text-gray-500 text-sm">Click to view details</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          {/* Back Button */}
          <button
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => setSelectedApp(null)}
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold mb-6">{selectedApp} - Dashboard</h2>

          {/* Metrics Section */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-gray-100 flex flex-col items-center">
                <Cpu className="w-6 h-6 text-blue-500 mb-2" />
                <span className="font-bold">{dummyMetrics.cpu}</span>
                <span className="text-sm text-gray-500">CPU Usage</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100 flex flex-col items-center">
                <MemoryStick className="w-6 h-6 text-green-500 mb-2" />
                <span className="font-bold">{dummyMetrics.memory}</span>
                <span className="text-sm text-gray-500">Memory</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100 flex flex-col items-center">
                <Server className="w-6 h-6 text-purple-500 mb-2" />
                <span className="font-bold">{dummyMetrics.ram}</span>
                <span className="text-sm text-gray-500">RAM Utilization</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100 flex flex-col items-center">
                <ClipboardList className="w-6 h-6 text-orange-500 mb-2" />
                <span className="font-bold">{dummyMetrics.processes}</span>
                <span className="text-sm text-gray-500">Processes</span>
              </div>
            </div>
          </div>

          {/* Upcoming Changes */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" /> Upcoming Changes
            </h3>
            <ul className="list-disc ml-6">
              {dummyChanges.map((chg) => (
                <li key={chg.id} className="mb-2">
                  {chg.change} -{" "}
                  <span className="text-gray-600">{chg.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Monitoring Setup */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" /> Monitoring Setup
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {monitoringSetup.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gray-100 text-center shadow-sm"
                >
                  <span className="font-bold">{tool.tool}</span>
                  <p
                    className={`text-sm mt-1 ${
                      tool.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {tool.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
it 