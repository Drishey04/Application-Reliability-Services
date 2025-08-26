import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sampleMetrics = [
  { time: "10:00", cpu: 35, memory: 60, utilization: 40 },
  { time: "10:05", cpu: 50, memory: 70, utilization: 55 },
  { time: "10:10", cpu: 45, memory: 65, utilization: 50 },
  { time: "10:15", cpu: 70, memory: 80, utilization: 75 },
];

const sampleIncidents = [
  { id: "INC1001", severity: "High", desc: "Database latency issue" },
  { id: "INC1002", severity: "Low", desc: "Minor UI glitch" },
];

const sampleChanges = [
  { id: "CHG2001", priority: "Standard", desc: "Scheduled patch update" },
];

export default function AppDetails() {
  const { appId } = useParams();

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>

      <h1 className="text-2xl font-bold mt-4">App Details: {appId.toUpperCase()}</h1>

      {/* Metrics Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">CPU Usage</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Memory Usage</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="memory" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incidents & Changes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Open Incidents</h2>
          <ul className="text-sm">
            {sampleIncidents.map((inc) => (
              <li key={inc.id} className="border-b py-2">
                <span className="font-semibold">{inc.id}</span> - {inc.desc}
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded ${
                    inc.severity === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {inc.severity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Upcoming Changes</h2>
          <ul className="text-sm">
            {sampleChanges.map((chg) => (
              <li key={chg.id} className="border-b py-2">
                <span className="font-semibold">{chg.id}</span> - {chg.desc}
                <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                  {chg.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
