import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Applications</p>
          <h2 className="text-2xl font-bold">8</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Healthy Apps</p>
          <h2 className="text-2xl font-bold flex items-center text-green-600">
            <CheckCircle className="mr-2" /> 6
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Warning Apps</p>
          <h2 className="text-2xl font-bold flex items-center text-yellow-600">
            <AlertTriangle className="mr-2" /> 1
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Critical Apps</p>
          <h2 className="text-2xl font-bold flex items-center text-red-600">
            <AlertOctagon className="mr-2" /> 1
          </h2>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Recent Applications</h2>
        <div className="space-y-4">
          {[
            { name: "E-commerce Frontend", url: "https://shop.example.com", status: "healthy", date: "Dec 15, 2024" },
            { name: "API Gateway", url: "https://api.example.com", status: "warning", date: "Dec 14, 2024" },
            { name: "Payment Service", url: "https://payments.example.com", status: "critical", date: "Dec 13, 2024" },
            { name: "User Authentication", url: "https://auth.example.com", status: "healthy", date: "Dec 12, 2024" },
            { name: "Database Service", url: "https://db.example.com", status: "healthy", date: "Dec 11, 2024" },
          ].map((app, idx) => (
            <div key={idx} className="flex justify-between items-center border rounded-lg p-3">
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-sm text-gray-500">{app.url}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    app.status === "healthy"
                      ? "bg-green-100 text-green-600"
                      : app.status === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {app.status}
                </span>
                <span className="text-sm text-gray-400">{app.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
