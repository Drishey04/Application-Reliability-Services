import React from "react";
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter,
} from "recharts";

const markerColor = (t) =>
  t === "incident" ? "#ef4444" : t === "change" ? "#f59e0b" : t === "deploy" ? "#3b82f6" : "#6b7280";

export default function IncidentChangeTimeline({ data }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow border">
      <div className="text-sm font-semibold mb-2">Correlation Timeline (CPU/Mem + Incidents/Changes/Deploys)</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="mem" fillOpacity={0.15} />
            <Line type="monotone" dataKey="cpu" strokeWidth={2} dot={false} />
            <Scatter data={data} fill="#111827" shape={(props) => {
              const d = props.payload;
              return (
                <circle cx={props.cx} cy={props.cy} r={d.type === "normal" ? 0 : 5} fill={markerColor(d.type)}>
                  <title>{d.label}</title>
                </circle>
              );
            }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3 text-xs">
        <LegendDot color="#ef4444" label="Incident" />
        <LegendDot color="#f59e0b" label="Change" />
        <LegendDot color="#3b82f6" label="Deploy" />
      </div>
    </div>
  );
}

const LegendDot = ({ color, label }) => (
  <div className="inline-flex items-center gap-2">
    <span className="w-3 h-3 rounded-full" style={{ background: color }} />
    <span>{label}</span>
  </div>
);
