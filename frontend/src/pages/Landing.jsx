import React, { useMemo, useState } from "react";
import { APPS, APP_DETAIL } from "../data/apps";
import { Search, Flame, ShieldCheck, TrendingUp, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q) return APPS;
    return APPS.filter(a => a.display.toLowerCase().includes(q.toLowerCase()) || a.slug.includes(q.toLowerCase()));
  }, [q]);

  const leaderboard = useMemo(() => {
    // sort by status healthiness: healthy > warning > critical
    const score = (s) => (s==="healthy"?3: s==="warning"?2:1);
    return APPS
      .map(a => ({ ...a, status: APP_DETAIL[a.slug]?.status || "unknown" }))
      .sort((a,b) => score(b.status) - score(a.status))
      .slice(0,5);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white p-8 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Enterprise Reliability Hub</h1>
            <p className="text-white/90 mt-2">
              Search any application to view health, incidents, changes, metrics, monitoring coverage & reports.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-white/90">
              <Badge icon={ShieldCheck} label="Audit Ready" />
              <Badge icon={TrendingUp} label="Reliability Index" />
              <Badge icon={Flame} label="AI Insights" />
            </div>
          </div>
          <button className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl hover:bg-blue-50">
            <RefreshCcw className="w-4 h-4" />
            Generate Weekly Report
          </button>
        </div>

        {/* Search */}
        <div className="mt-6 bg-white rounded-xl p-2 flex items-center gap-2 shadow">
          <Search className="w-4 h-4 text-gray-500 ml-2" />
          <input
            className="flex-1 px-2 py-2 rounded-md outline-none"
            placeholder="Search for an app… try 'Case' or 'ProSuite'"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            onClick={() => filtered[0] && navigate(`/app/${filtered[0].slug}`)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Open
          </button>
        </div>
      </section>

      {/* Health Heat (simple) + Leaderboard */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Applications</h3>
            <span className="text-xs text-gray-500">{filtered.length} results</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((a) => (
              <button
                key={a.slug}
                onClick={() => navigate(`/app/${a.slug}`)}
                className="group text-left p-4 rounded-xl border bg-white hover:bg-gray-50 hover:shadow transition"
              >
                <div className="flex items-center gap-2">
                  <a.icon className="w-5 h-5 text-gray-600 group-hover:scale-110 transition" />
                  <div className="font-medium">{a.display}</div>
                </div>
                <div className="mt-2 text-xs text-gray-500">{a.url}</div>
                <div className="mt-3">
                  <HealthDot status={(APP_DETAIL[a.slug]||{}).status} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border">
          <h3 className="font-semibold mb-3">Reliability Index (Top)</h3>
          <div className="space-y-2">
            {leaderboard.map((a,i) => (
              <div key={a.slug} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-gray-500">{i+1}.</span>
                  <a.icon className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">{a.display}</span>
                </div>
                <HealthDot status={(APP_DETAIL[a.slug]||{}).status} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const Badge = ({ icon: Icon, label }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </span>
);

const HealthDot = ({ status }) => {
  const c = status === "healthy" ? "bg-green-500"
    : status === "warning" ? "bg-yellow-500"
    : status === "critical" ? "bg-red-500"
    : "bg-gray-300";
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${c}`} />;
}
