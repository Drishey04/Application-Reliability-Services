import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AutomationScripts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // Dummy data
  const scripts = [
    {
      id: 1,
      name: "Frontend Deployment Pipeline",
      type: "Deployment",
      description: "Automated deployment for React frontend with build optimization",
      lastRun: "2 hours ago",
      status: "Success",
      isRunning: false,
    },
    {
      id: 2,
      name: "Database Backup",
      type: "Maintenance",
      description: "Daily automated backup of production databases",
      lastRun: "Scheduled Daily at 2:00 AM",
      status: "Success",
      isRunning: false,
    },
  ];

  const tabs = ["All", "Deployment", "Monitoring", "Pre-checks", "Maintenance"];

  const filteredScripts =
    activeTab === "All"
      ? scripts
      : scripts.filter((s) => s.type === activeTab);

  const statusColor = {
    Success: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Running: "bg-blue-100 text-blue-700",
  };

  const typeColor = {
    Deployment: "bg-blue-100 text-blue-700",
    Monitoring: "bg-green-100 text-green-700",
    "Pre-checks": "bg-emerald-100 text-emerald-700",
    Maintenance: "bg-purple-100 text-purple-700",
  };

  // Navigate to Script Runner Page
  const handleRunScript = (script) => {
    navigate(`/automation/run/${script.name}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Automation Scripts</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 cursor-pointer hover:text-blue-500 transition ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Script Cards */}
      <div className="space-y-4">
        {filteredScripts.map((script) => (
          <div
            key={script.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-medium">{script.name}</h3>
              <p className="text-sm text-gray-500">{script.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${typeColor[script.type]}`}
                >
                  {script.type}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${statusColor[script.status]}`}
                >
                  {script.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                onClick={() => handleRunScript(script)}
              >
                Run Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationScripts;
