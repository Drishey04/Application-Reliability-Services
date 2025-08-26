import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar,
  Users,
  Server,
} from "lucide-react";

const changePriorityColors = {
  Low: "bg-green-100 border-green-400",
  Medium: "bg-yellow-100 border-yellow-400",
  High: "bg-orange-100 border-orange-400",
  Critical: "bg-red-100 border-red-400",
  Standard: "bg-blue-100 border-blue-400",
};

const statusColors = {
  healthy: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  critical: "bg-red-100 text-red-700",
};

const apps = [
  {
    name: "Case",
    url: "https://case.example.com",
    status: "healthy",
    response: "230ms",
    changes: [
      {
        id: "CHG100245",
        title: "UI Enhancement - Dashboard Revamp",
        priority: "Standard",
        time: "Dec 18, 2024 2:00 AM - 4:00 AM EST",
        team: "Frontend Team",
      },
      {
        id: "CHG100246",
        title: "Security Patch - CVE-2024-5678",
        priority: "Low",
        time: "Dec 20, 2024 1:00 AM - 1:30 AM EST",
        team: "Security Team",
      },
    ],
    monitoring: {
      Production: [
        { name: "Prometheus", status: "ok" },
        { name: "Splunk SIEM", status: "ok" },
        { name: "PagerDuty", status: "fail" },
        { name: "Grafana", status: "ok" },
      ],
      Staging: [
        { name: "Prometheus", status: "ok" },
        { name: "Basic Logging", status: "ok" },
        { name: "Grafana", status: "ok" },
      ],
      Development: [
        { name: "Prometheus", status: "warn" },
        { name: "Local Logs", status: "ok" },
      ],
    },
  },
  {
    name: "eTask",
    url: "https://etask.example.com",
    status: "warning",
    response: "1.1s",
    changes: [
      {
        id: "CHG100289",
        title: "DB Performance Tuning",
        priority: "High",
        time: "Dec 16, 2024 2:00 AM - 4:00 AM EST",
        team: "Platform Team",
      },
    ],
    monitoring: {
      Production: [
        { name: "Prometheus", status: "ok" },
        { name: "App Logging", status: "ok" },
        { name: "Datadog APM", status: "ok" },
      ],
      Staging: [
        { name: "Prometheus", status: "ok" },
        { name: "Load Testing", status: "ok" },
      ],
      Development: [
        { name: "Prometheus", status: "ok" },
        { name: "Debug Logs", status: "ok" },
      ],
    },
  },
  {
    name: "atWork",
    url: "https://atwork.example.com",
    status: "critical",
    response: "Error",
    changes: [
      {
        id: "CHG100311",
        title: "Cluster Migration",
        priority: "Critical",
        time: "Dec 17, 2024 12:00 AM - 3:00 AM EST",
        team: "DB Ops",
      },
    ],
    monitoring: {
      Production: [
        { name: "Prometheus", status: "ok" },
        { name: "Fraud Detection", status: "ok" },
        { name: "Payment Logs", status: "ok" },
      ],
      Staging: [
        { name: "Test Payments", status: "ok" },
        { name: "Stripe Sandbox", status: "ok" },
      ],
      Development: [
        { name: "Mock Payments", status: "ok" },
      ],
    },
  },
  {
    name: "ESPA",
    url: "https://espa.example.com",
    status: "healthy",
    response: "310ms",
    changes: [
      {
        id: "CHG100400",
        title: "Backend Service Upgrade",
        priority: "Medium",
        time: "Dec 19, 2024 2:00 AM - 4:00 AM EST",
        team: "Backend Team",
      },
    ],
    monitoring: {
      Production: [
        { name: "Prometheus", status: "ok" },
        { name: "ThousandEyes", status: "ok" },
        { name: "Grafana", status: "ok" },
      ],
      Staging: [
        { name: "Prometheus", status: "ok" },
        { name: "Basic Logging", status: "ok" },
      ],
      Development: [
        { name: "Prometheus", status: "ok" },
      ],
    },
  },
  {
    name: "LAAS",
    url: "https://laas.example.com",
    status: "warning",
    response: "890ms",
    changes: [
      {
        id: "CHG100500",
        title: "Authentication Module Patch",
        priority: "High",
        time: "Dec 21, 2024 12:00 AM - 3:00 AM EST",
        team: "Auth Team",
      },
    ],
    monitoring: {
      Production: [
        { name: "Prometheus", status: "ok" },
        { name: "Splunk SIEM", status: "ok" },
      ],
      Staging: [
        { name: "Prometheus", status: "ok" },
        { name: "Grafana", status: "ok" },
      ],
      Development: [
        { name: "Prometheus", status: "ok" },
        { name: "Debug Logs", status: "ok" },
      ],
    },
  },
  {
    name: "ProSuite",
    url: "https://prosuite.example.com",
    status: "healthy",
    response: "190ms",
    changes: [
      {
        id: "CHG100600",
        title: "UI Theme Upgrade",
        priority: "Standard",
        time: "Dec 22, 2024 1:00 AM - 2:00 AM EST",
        team: "UI Team",
      },
    ],
    monitoring: {
      Production: [
        { name: "Prometheus", status: "ok" },
        { name: "Grafana", status: "ok" },
      ],
      Staging: [
        { name: "Prometheus", status: "ok" },
        { name: "Basic Logging", status: "ok" },
      ],
      Development: [
        { name: "Prometheus", status: "ok" },
      ],
    },
  },
];

const HealthStatus = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {apps.map((app) => (
        <div
          key={app.name}
          className="bg-white rounded-2xl shadow-md border p-4 flex flex-col"
        >
          {/* App Title */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{app.name}</h2>
            {app.status === "healthy" ? (
              <CheckCircle className="text-green-500" />
            ) : app.status === "warning" ? (
              <AlertTriangle className="text-yellow-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
          </div>

          <p className="text-sm text-gray-600">
            URL:{" "}
            <a href={app.url} className="text-blue-600 underline">
              {app.url}
            </a>
          </p>

          <span
            className={`px-2 py-1 text-xs rounded ${statusColors[app.status]}`}
          >
            {app.status}
          </span>

          <p className="mt-2 text-sm font-medium">
            Response Time: <span className="font-bold">{app.response}</span>
          </p>

          {/* Upcoming Changes */}
          <h3 className="mt-4 text-sm font-semibold flex items-center gap-2">
            <Calendar size={16} /> Upcoming Changes (ServiceNow)
          </h3>
          <div className="space-y-2 mt-2">
            {app.changes.map((chg) => (
              <div
                key={chg.id}
                className={`p-2 rounded-md border text-sm ${changePriorityColors[chg.priority]}`}
              >
                <p className="font-medium">{chg.id}</p>
                <p>{chg.title}</p>
                <p className="text-xs text-gray-600">{chg.time}</p>
                <p className="text-xs flex items-center gap-1">
                  <Users size={12} /> Assigned: {chg.team}
                </p>
              </div>
            ))}
          </div>

          {/* Monitoring Setup */}
          <h3 className="mt-4 text-sm font-semibold flex items-center gap-2">
            <Server size={16} /> Current Monitoring Setup
          </h3>
          <div className="mt-2 space-y-2">
            {Object.entries(app.monitoring).map(([env, tools]) => (
              <div key={env} className="bg-gray-50 rounded-md p-2">
                <p className="text-xs font-medium mb-1">{env} Environment</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool.name}
                      className={`px-2 py-0.5 text-xs rounded ${
                        tool.status === "ok"
                          ? "bg-green-100 text-green-700"
                          : tool.status === "fail"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Last Checked: Dec 15, 2024 2:34 PM
          </p>
        </div>
      ))}
    </div>
  );
};

export default HealthStatus;
