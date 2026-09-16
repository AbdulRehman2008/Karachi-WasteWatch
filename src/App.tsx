import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CitizenApp from "./components/CitizenApp";
import AdminDashboard from "./components/AdminDashboard";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

type AppView = "citizen" | "admin" | "analytics";

export default function App() {
  const [view, setView] = useState<AppView>("citizen");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top switcher bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-2 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2 mr-6">
            <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-gray-800">Karachi WasteWatch AI</span>
          </div>
          {[
            { id: "citizen", label: "Citizen App" },
            { id: "analytics", label: "Analytics" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => (v.id === "admin" ? navigate("/admin") : setView(v.id as AppView))}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                view === v.id
                  ? "bg-green-700 text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {view === "citizen" && <CitizenApp />}
        {view === "analytics" && <AnalyticsDashboard />}
      </div>
    </div>
  );
}
