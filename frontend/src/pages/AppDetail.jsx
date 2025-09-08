import React from "react";
import { useParams } from "react-router-dom";
import { APPS, APP_DETAIL } from "../data/apps";
import { AlertOctagon, GitCommit, Server, Activity, FileText, ShieldCheck } from "lucide-react";
import MetricChart from "../components/MetricChart";
import IncidentChangeTimeline from "../components/IncidentChangeTimeline";
import HealthScoreBadge from "../components/HealthScoreBadge";

const chip = (status) =>
  status === "ok" ? "bg-green-100 text-green-700" :
  status === "warn" ? "bg-yellow-100 text-yellow-700" :
  status === "fail" ? "bg-red-100 text-red-700" :
  "bg-gray-100 text-gray-700";

export default function AppDetail() {
  const { slug } = useParams();
  const meta = APPS.find(a => a.slug === slug);
  const data = APP_DETAIL[slug];

  if (!meta || !data) {
    return <div className="text-gray-600">App not found.</div>;
  }

  const envs = Object.entries(data.environments);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <meta.icon className="w-6 h-6 text-gray-700" />
            <div>
              <div className="text-xl font-semibold">{meta.display}</div>
              <div className="text-xs text-gray-500">{meta.url}</div>
            </div>
            <HealthScoreBadge status={data.status} />
            <span className="ml-2 text-xs text-gray-500">{data.owners.join(" • ")}</span>
          </div>
          <button className="px-3 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700">
            Ask AI Summary
          </button>
        </div>
      </div>

      {/* Correlation timeline */}
      <IncidentChangeTimeline data={data.timeline} />

      {/* Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <MetricChart data={envs[0][1].metrics} dataKey="cpu" title="CPU Utilization (%)" unit="%" />
        <MetricChart data={envs[0][1].metrics} dataKey="mem" title="Memory Utilization (%)" unit="%" />
        <MetricChart data={envs[0][1].metrics} dataKey="proc" title="Processes Running" />
      </div>

      {/* Incidents & Changes */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow border">
          <div className="flex items-center gap-2 font-semibold mb-3">
            <AlertOctagon className="w-4 h-4" /> Incidents
          </div>
          <div className="space-y-2">
            {data.incidents.map((i) => (
              <div key={i.id} className="p-3 border rounded-xl hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm">{i.id}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">{i.sev}</span>
                </div>
                <div className="text-sm">{i.title}</div>
                <div className="text-xs text-gray-500">{i.when} • {i.state}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border">
          <div className="flex items-center gap-2 font-semibold mb-3">
            <GitCommit className="w-4 h-4" /> Upcoming Changes (ServiceNow)
          </div>
          <div className="space-y-2">
            {data.changes.map((c) => (
              <div key={c.id} className={`p-3 border rounded-xl
                ${c.priority === "Low" ? "bg-green-50 border-green-200" :
                  c.priority === "High" ? "bg-orange-50 border-orange-200" :
                  "bg-blue-50 border-blue-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm">{c.id}</div>
                  <span className={`text-xs font-medium
                    ${c.priority === "Low" ? "text-green-700" :
                      c.priority === "High" ? "text-orange-700" :
                      "text-blue-700"}`}>
                    {c.priority}
                  </span>
                </div>
                <div className="text-sm">{c.title}</div>
                <div className="text-xs text-gray-500">{c.window}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monitoring coverage per environment */}
      <div className="bg-white rounded-2xl p-4 shadow border">
        <div className="flex items-center gap-2 font-semibold mb-4">
          <Server className="w-4 h-4" /> Monitoring Coverage by Environment
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {envs.map(([envName, env]) => (
            <div key={envName} className="p-4 rounded-xl border">
              <div className="text-sm font-semibold mb-2">{envName}</div>
              <div className="flex flex-wrap gap-2">
                {env.tools.map((t, idx) => (
                  <span key={idx} className={`px-2 py-1 rounded-md text-xs ${chip(t.status)}`}>
                    <Activity className="w-3 h-3 inline mr-1" />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" /> Coverage matrix helps audit readiness & gaps.
        </div>
      </div>

      {/* Reports CTA */}
      <div className="bg-white rounded-2xl p-4 shadow border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-700" />
          <div>
            <div className="font-semibold">Generate Audit Report</div>
            <div className="text-xs text-gray-500">Incidents, uptime, SLA breaches, monitoring matrix.</div>
          </div>
        </div>
        <button className="px-3 py-2 rounded-lg text-sm bg-gray-900 text-white hover:bg-black">Create PDF</button>
      </div>
    </div>
  );
}
