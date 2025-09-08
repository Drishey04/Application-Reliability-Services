import { useNavigate } from "react-router-dom";

const apps = [
  { id: "case", name: "Case Management", url: "https://case.example.com", status: "healthy" },
  { id: "etask", name: "E-Task", url: "https://etask.example.com", status: "warning" },
  { id: "atwork", name: "AtWork", url: "https://atwork.example.com", status: "critical" },
  { id: "espa", name: "ESPA", url: "https://espa.example.com", status: "healthy" },
  { id: "laas", name: "LAAS", url: "https://laas.example.com", status: "warning" },
  { id: "prosuite", name: "ProSuite", url: "https://prosuite.example.com", status: "healthy" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <div
          key={app.id}
          className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(`/app/${app.id}`)}
        >
          <h2 className="text-lg font-semibold">{app.name}</h2>
          <p className="text-sm text-gray-500">{app.url}</p>
          <span
            className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
              app.status === "healthy"
                ? "bg-green-100 text-green-700"
                : app.status === "warning"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
}
