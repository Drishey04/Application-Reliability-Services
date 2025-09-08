import {
    Globe,
    Briefcase,
    ClipboardList,
    Layers,
    Boxes,
    MonitorSmartphone,
  } from "lucide-react";
  
  /** Enterprise app catalog */
  export const APPS = [
    { name: "case", display: "Case", slug: "case", icon: Briefcase, url: "https://case.example.com" },
    { name: "etask", display: "eTask", slug: "etask", icon: ClipboardList, url: "https://etask.example.com" },
    { name: "atwork", display: "AtWork", slug: "atwork", icon: MonitorSmartphone, url: "https://atwork.example.com" },
    { name: "espa", display: "ESPA", slug: "espa", icon: Layers, url: "https://espa.example.com" },
    { name: "laas", display: "LaaS", slug: "laas", icon: Boxes, url: "https://laas.example.com" },
    { name: "prosuite", display: "ProSuite", slug: "prosuite", icon: Globe, url: "https://prosuite.example.com" },
  ];
  
  /** Health + incidents/changes + monitoring coverage for detail page */
  export const APP_DETAIL = {
    case: {
      status: "healthy",
      owners: ["LOB-A • Case Team"],
      environments: {
        Production: {
          metrics: mkMetrics(24),
          tools: [
            { name: "Prometheus", status: "ok" },
            { name: "ThousandEyes", status: "ok" },
            { name: "Splunk", status: "ok" },
            { name: "Grafana", status: "ok" },
            { name: "PagerDuty", status: "warn" },
          ],
        },
        Staging: {
          metrics: mkMetrics(24),
          tools: [
            { name: "Prometheus", status: "ok" },
            { name: "Basic Logging", status: "ok" },
          ],
        },
        Development: {
          metrics: mkMetrics(24),
          tools: [
            { name: "Prometheus", status: "warn" },
            { name: "Local Logs", status: "ok" },
          ],
        },
      },
      timeline: mkTimeline(),
      incidents: [
        { id: "INC0009871", sev: "P2", title: "Intermittent 5xx on /search", when: "2h ago", state: "Open" },
        { id: "INC0009720", sev: "P4", title: "Slow queries on read replica", when: "1d ago", state: "Resolved" },
      ],
      changes: [
        { id: "CHG0013001", priority: "High", title: "Node 20 upgrade", window: "Fri 02:00–03:00 UTC" },
        { id: "CHG0013015", priority: "Low", title: "Copy tweaks on UI", window: "Sat 11:00–11:15 UTC" },
      ],
    },
    etask: similarApp("warning"),
    atwork: similarApp("healthy"),
    espa: similarApp("critical"),
    laas: similarApp("healthy"),
    prosuite: similarApp("warning"),
  };
  
  /** Helpers */
  function mkMetrics(hours = 24) {
    const now = Date.now();
    return Array.from({ length: hours }).map((_, i) => {
      const t = new Date(now - (hours - i) * 60 * 60 * 1000);
      return {
        time: t.toLocaleTimeString([], { hour: "2-digit" }),
        cpu: Math.max(5, Math.min(95, 40 + Math.round(25 * Math.sin(i / 2)) + rand(-8, 8))),
        mem: Math.max(10, Math.min(95, 55 + Math.round(20 * Math.cos(i / 3)) + rand(-6, 6))),
        proc: Math.max(1, 120 + rand(-15, 15)),
      };
    });
  }
  function mkTimeline() {
    // points annotated with incidents/changes/deploys
    return [
      { time: "08:00", cpu: 35, mem: 58, type: "deploy", label: "Release 2.3.1" },
      { time: "10:00", cpu: 62, mem: 65, type: "incident", label: "P2 spike" },
      { time: "12:00", cpu: 48, mem: 60, type: "change", label: "DB index add" },
      { time: "14:00", cpu: 70, mem: 72, type: "incident", label: "Cache evictions" },
      { time: "16:00", cpu: 45, mem: 55, type: "normal", label: "" },
    ];
  }
  function similarApp(status) {
    return {
      status,
      owners: ["LOB-B • Shared Services"],
      environments: {
        Production: { metrics: mkMetrics(24), tools: [
          { name: "Prometheus", status: "ok" },
          { name: "Splunk", status: "ok" },
          { name: "ThousandEyes", status: status === "critical" ? "fail" : "ok" },
        ]},
        Staging: { metrics: mkMetrics(24), tools: [
          { name: "Prometheus", status: "ok" },
          { name: "Basic Logging", status: "ok" },
        ]},
        Development: { metrics: mkMetrics(24), tools: [
          { name: "Prometheus", status: "warn" },
          { name: "Local Logs", status: "ok" },
        ]},
      },
      timeline: mkTimeline(),
      incidents: [
        { id: "INC0009100", sev: "P3", title: "Latency high on /auth", when: "6h ago", state: "Open" },
      ],
      changes: [
        { id: "CHG0012990", priority: "Standard", title: "Library updates", window: "Sun 03:00–03:15 UTC" },
      ],
    };
  }
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  