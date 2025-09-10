// frontend/src/pages/AppHealthDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Activity,
  Thermometer,
  Heart,
  Shield,
  Cpu,
  Database,
  Cloud,
  Moon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tailwind card
const Card = ({ children }) => (
  <div className="p-4 shadow-xl rounded-2xl bg-gray-900 text-green-400 font-mono border border-green-700">
    {children}
  </div>
);

const Progress = ({ value, color }) => (
  <div className="w-full bg-gray-800 h-2 rounded">
    <div
      className={`${color} h-2 rounded`}
      style={{ width: `${value}%` }}
    />
  </div>
);

// Generate sample data
const generateSeries = (min, max) =>
  Array.from({ length: 15 }, (_, i) => ({
    time: i,
    value: Math.floor(min + Math.random() * (max - min)),
  }));

const apps = [
  { id: 1, name: "Case" },
  { id: 2, name: "eTask" },
  { id: 3, name: "atWork" },
  { id: 4, name: "ESPA" },
  { id: 5, name: "LAAS" },
  { id: 6, name: "ProSuite" },
];

const AppHealthDashboard = () => {
  const [data, setData] = useState(
    apps.reduce((acc, app) => {
      acc[app.id] = {
        heartbeat: generateSeries(40, 120), // Request throughput
        bloodPressure: generateSeries(80, 400), // Response time
        temperature: Math.floor(Math.random() * 30), // Error rate %
        oxygen: 85 + Math.floor(Math.random() * 15), // Uptime %
        respiration: Math.floor(Math.random() * 50), // Queue jobs
        cpu: Math.floor(Math.random() * 100), // CPU %
        memory: Math.floor(Math.random() * 100), // Memory %
        immunity: Math.random() > 0.2 ? "Strong" : "Weak", // Security
        sleep: Math.floor(70 + Math.random() * 30), // Deploy stability %
      };
      return acc;
    }, {})
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const updated = { ...prev };
        for (const appId in updated) {
          updated[appId] = {
            ...updated[appId],
            heartbeat: [
              ...updated[appId].heartbeat.slice(1),
              { time: Date.now(), value: 40 + Math.floor(Math.random() * 80) },
            ],
            bloodPressure: [
              ...updated[appId].bloodPressure.slice(1),
              { time: Date.now(), value: 80 + Math.floor(Math.random() * 320) },
            ],
            temperature: Math.floor(Math.random() * 30),
            oxygen: 85 + Math.floor(Math.random() * 15),
            respiration: Math.floor(Math.random() * 50),
            cpu: Math.floor(Math.random() * 100),
            memory: Math.floor(Math.random() * 100),
            immunity: Math.random() > 0.2 ? "Strong" : "Weak",
            sleep: Math.floor(70 + Math.random() * 30),
          };
        }
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {apps.map((app) => {
        const vitals = data[app.id];
        const unhealthy =
          vitals.temperature > 20 ||
          vitals.cpu > 85 ||
          vitals.memory > 85 ||
          vitals.oxygen < 90;

        return (
          <Card key={app.id}>
            <h2
              className={`text-lg mb-4 font-bold flex items-center justify-between ${
                unhealthy ? "text-red-400 animate-pulse" : "text-green-400"
              }`}
            >
              {app.name}
            </h2>

            {/* Heartbeat → Request Throughput */}
            <div className="mb-3">
              <p className="text-xs flex items-center gap-2">
                <Heart size={14} className="text-pink-400" />
                Request Throughput (req/sec)
              </p>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={vitals.heartbeat}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00ffcc"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <XAxis hide dataKey="time" />
                  <YAxis hide domain={[0, 150]} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Blood Pressure → Response Time */}
            <div className="mb-3">
              <p className="text-xs flex items-center gap-2">
                <Activity size={14} className="text-yellow-400" />
                Response Time (ms)
              </p>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={vitals.bloodPressure}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ff0066"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <XAxis hide dataKey="time" />
                  <YAxis hide domain={[0, 500]} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Temperature → Error Rate */}
            <p className="text-xs mb-2 flex items-center gap-2">
              <Thermometer size={14} className="text-red-400" />
              Error Rate:{" "}
              <span
                className={
                  vitals.temperature > 15 ? "text-red-400" : "text-green-400"
                }
              >
                {vitals.temperature}%
              </span>
            </p>

            {/* Oxygen → Uptime */}
            <p className="text-xs mb-1 flex items-center gap-2">
              <Cloud size={14} className="text-blue-400" />
              Uptime
            </p>
            <Progress
              value={vitals.oxygen}
              color={
                vitals.oxygen > 95
                  ? "bg-green-400"
                  : vitals.oxygen > 90
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }
            />
            <span className="text-xs">{vitals.oxygen}%</span>

            {/* Respiration → Queue Jobs */}
            <p className="text-xs mt-2 flex items-center gap-2">
              <Database size={14} className="text-purple-400" />
              Queue Jobs:{" "}
              <span
                className={vitals.respiration > 30 ? "text-yellow-400" : ""}
              >
                {vitals.respiration}
              </span>
            </p>

            {/* BMI → CPU + Memory */}
            <div className="flex justify-between text-xs mt-2">
              <p className="flex items-center gap-1">
                <Cpu size={14} className="text-orange-400" /> CPU:{" "}
                <span
                  className={vitals.cpu > 85 ? "text-red-400" : "text-green-400"}
                >
                  {vitals.cpu}%
                </span>
              </p>
              <p className="flex items-center gap-1">
                <Database size={14} className="text-cyan-400" /> Mem:{" "}
                <span
                  className={
                    vitals.memory > 85 ? "text-red-400" : "text-green-400"
                  }
                >
                  {vitals.memory}%
                </span>
              </p>
            </div>

            {/* Immunity → Security */}
            <p className="text-xs mt-2 flex items-center gap-2">
              <Shield size={14} className="text-green-500" />
              Immunity:{" "}
              <span
                className={
                  vitals.immunity === "Weak" ? "text-red-400" : "text-green-400"
                }
              >
                {vitals.immunity}
              </span>
            </p>

            {/* Sleep → Deploy Stability */}
            <p className="text-xs mt-2 flex items-center gap-2">
              <Moon size={14} className="text-indigo-400" />
              Sleep (Deploy Stability):{" "}
              <span
                className={
                  vitals.sleep < 80 ? "text-yellow-400" : "text-green-400"
                }
              >
                {vitals.sleep}%
              </span>
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default AppHealthDashboard;
