import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type NavItem = "dashboard" | "reports" | "map" | "analytics" | "hotspots" | "users" | "notifications" | "settings";
type ReportStatus = "Open" | "Assigned" | "In Progress" | "Resolved";

const initialReports = [
  { id: "KW-000124", type: "Garbage",  severity: "High",   status: "Open"        as ReportStatus, location: "Gulshan-e-Iqbal", date: "14 Sep 2026" },
  { id: "KW-000123", type: "Overflow", severity: "Medium", status: "Assigned"    as ReportStatus, location: "Korangi",          date: "14 Sep 2026" },
  { id: "KW-000122", type: "Garbage",  severity: "Low",    status: "Resolved"    as ReportStatus, location: "Clifton",          date: "13 Sep 2026" },
  { id: "KW-000121", type: "Dumping",  severity: "High",   status: "Open"        as ReportStatus, location: "North Karachi",    date: "13 Sep 2026" },
  { id: "KW-000120", type: "Garbage",  severity: "Medium", status: "In Progress" as ReportStatus, location: "Nazimabad",        date: "12 Sep 2026" },
  { id: "KW-000119", type: "Overflow", severity: "High",   status: "Open"        as ReportStatus, location: "Saddar",           date: "12 Sep 2026" },
  { id: "KW-000118", type: "Garbage",  severity: "Low",    status: "Resolved"    as ReportStatus, location: "Lyari",            date: "11 Sep 2026" },
  { id: "KW-000117", type: "Dumping",  severity: "Medium", status: "Assigned"    as ReportStatus, location: "Malir",            date: "11 Sep 2026" },
];

const initialUsers = [
  { id: 1, name: "Ahmed Raza",    email: "ahmed@gmail.com",   role: "Citizen",   reports: 14, status: "Active"   },
  { id: 2, name: "Sara Khan",     email: "sara@gmail.com",    role: "Citizen",   reports: 9,  status: "Active"   },
  { id: 3, name: "Ali Hassan",    email: "ali@gov.pk",        role: "Inspector", reports: 0,  status: "Active"   },
  { id: 4, name: "Fatima Malik",  email: "fatima@gmail.com",  role: "Citizen",   reports: 6,  status: "Inactive" },
  { id: 5, name: "Usman Tariq",   email: "usman@gmail.com",   role: "Citizen",   reports: 22, status: "Active"   },
];

const initialNotifications = [
  { id: 1, icon: "📋", title: "New report submitted",      desc: "Report #KW-000124 has been received.",                       time: "2m ago",  color: "bg-blue-50",   read: false },
  { id: 2, icon: "🤖", title: "AI detected high severity", desc: "Report #KW-000120 is marked as High severity.",              time: "5m ago",  color: "bg-red-50",    read: false },
  { id: 3, icon: "👤", title: "Report assigned",           desc: "Report #KW-000122 has been assigned to a field worker.",     time: "12m ago", color: "bg-yellow-50", read: false },
  { id: 4, icon: "✅", title: "Report resolved",           desc: "Report #KW-000118 has been resolved. Thank you!",            time: "1h ago",  color: "bg-green-50",  read: true  },
  { id: 5, icon: "⚠️", title: "Hotspot detected",          desc: "Gulshan-e-Iqbal has 5+ open reports — flagged as hotspot.", time: "2h ago",  color: "bg-orange-50", read: true  },
  { id: 6, icon: "📋", title: "New report submitted",      desc: "Report #KW-000119 has been received.",                       time: "3h ago",  color: "bg-blue-50",   read: true  },
];

const navItems: { id: NavItem; label: string; icon: string }[] = [
  { id: "dashboard",     label: "Dashboard",     icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "reports",       label: "Reports",       icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { id: "map",           label: "Map",           icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { id: "analytics",     label: "Analytics",     icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "hotspots",      label: "Hotspots",      icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
  { id: "users",         label: "Users",         icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { id: "notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { id: "settings",      label: "Settings",      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

const mapPins = [
  { x: 42, y: 28, sev: "high" }, { x: 58, y: 35, sev: "high" },
  { x: 35, y: 42, sev: "medium" }, { x: 68, y: 48, sev: "low" },
  { x: 28, y: 55, sev: "high" }, { x: 52, y: 58, sev: "medium" },
  { x: 44, y: 68, sev: "low" }, { x: 72, y: 38, sev: "medium" },
  { x: 25, y: 35, sev: "low" }, { x: 60, y: 22, sev: "high" },
];
const sevColor = { high: "#ef4444", medium: "#f97316", low: "#22c55e" };

const statusBadge = (s: string) => {
  const map: Record<string, string> = { Open: "bg-red-100 text-red-700", Assigned: "bg-blue-100 text-blue-700", Resolved: "bg-green-100 text-green-700", "In Progress": "bg-yellow-100 text-yellow-700" };
  return map[s] || "bg-gray-100 text-gray-700";
};
const sevBadge = (s: string) => {
  const map: Record<string, string> = { High: "text-red-600 font-semibold", Medium: "text-orange-500 font-semibold", Low: "text-green-600 font-semibold" };
  return map[s] || "text-gray-600";
};

const pageTitle: Record<NavItem, { title: string; sub: string }> = {
  dashboard:     { title: "Dashboard",     sub: "Overview of waste reports and city statistics" },
  reports:       { title: "Reports",       sub: "Manage and update all waste reports" },
  map:           { title: "Map View",      sub: "Geographic distribution of waste reports across Karachi" },
  analytics:     { title: "Analytics",     sub: "Trends, insights, and performance metrics" },
  hotspots:      { title: "Hotspots",      sub: "Areas with high concentration of waste reports" },
  users:         { title: "Users",         sub: "Manage citizen reporters and field workers" },
  notifications: { title: "Notifications", sub: "System alerts and activity updates" },
  settings:      { title: "Settings",      sub: "Configure system preferences and integrations" },
};

function MapSvg() {
  return (
    <div className="relative w-full" style={{ height: 320 }}>
      <svg viewBox="0 0 100 70" className="w-full h-full">
        <rect width="100" height="70" fill="#f0fdf4" />
        <ellipse cx="75" cy="60" rx="28" ry="16" fill="#bfdbfe" opacity="0.6" />
        {[18,30,42,54].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="1.2" />)}
        {[15,28,42,56,70,84].map(x => <line key={x} x1={x} y1="0" x2={x} y2="70" stroke="white" strokeWidth="1.2" />)}
        <rect x="18" y="12" width="22" height="16" fill="#dcfce7" rx="2" />
        <text x="29" y="21" textAnchor="middle" fontSize="3" fill="#065f46" fontFamily="Inter">Gulshan-e-Iqbal</text>
        <text x="32" y="8" textAnchor="middle" fontSize="3.5" fill="#374151" fontFamily="Inter" fontWeight="600">North Karachi</text>
        <text x="58" y="50" textAnchor="middle" fontSize="4" fill="#1d4ed8" fontFamily="Inter" fontWeight="600">Karachi</text>
        <text x="20" y="50" textAnchor="middle" fontSize="3" fill="#374151" fontFamily="Inter">Nazimabad</text>
        <text x="42" y="60" textAnchor="middle" fontSize="3" fill="#374151" fontFamily="Inter">Clifton</text>
        <text x="62" y="30" textAnchor="middle" fontSize="3" fill="#374151" fontFamily="Inter">Korangi</text>
        {mapPins.map((pin, i) => (
          <g key={i}>
            <circle cx={pin.x} cy={pin.y} r="3" fill={sevColor[pin.sev as keyof typeof sevColor]} opacity="0.85" />
            <circle cx={pin.x} cy={pin.y} r="1.2" fill="white" />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 bg-white rounded-lg border border-gray-200 px-2 py-1.5 space-y-1">
        {[["High","#ef4444"],["Medium","#f97316"],["Low","#22c55e"]].map(([l,c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            <span className="text-[10px] text-gray-600">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map(d => (
        <div key={d.label} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-[9px] text-gray-500">{d.value}</span>
          <div className="w-full rounded-t" style={{ height: `${(d.value / max) * 100}px`, background: d.color }} />
          <span className="text-[9px] text-gray-500 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const ok = sessionStorage.getItem("isAdmin");
    if (!ok) navigate("/admin");
  }, [navigate]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [reports, setReports] = useState(initialReports);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState({ aiDetection: true, autoAssign: false, emailAlerts: true, smsAlerts: false, reportThreshold: "5", retentionDays: "90" });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  function updateReportStatus(id: string, status: ReportStatus) {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setSelectedReport(null);
  }

  function deleteReport(id: string) {
    setReports(prev => prev.filter(r => r.id !== id));
    setSelectedReport(null);
  }

  function toggleUserStatus(id: number) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function dismissNotification(id: number) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function saveSettings() {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  }

  const filteredReports = reports.filter(r => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSev = severityFilter === "All" || r.severity === severityFilter;
    const matchSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.location.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSev && matchSearch;
  });

  return (
    <div className="flex h-[calc(100vh-48px)] bg-gray-100">
      {/* Sidebar */}
      {/* Sidebar - hidden on small screens */}
  <div className="hidden md:flex w-52 bg-green-900 flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-green-800">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-700"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5" /></svg>
          </div>
          <div>
            <div className="text-white text-xs font-bold leading-tight">Karachi</div>
            <div className="text-green-300 text-xs leading-tight">WasteWatch AI</div>
          </div>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${activeNav === item.id ? "bg-green-700 text-white" : "text-green-200 hover:bg-green-800 hover:text-white"}`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                {item.icon.split("M").filter(Boolean).map((d, i) => (
                  <path key={i} strokeLinecap="round" strokeLinejoin="round" d={"M" + d} />
                ))}
              </svg>
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === "notifications" && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-green-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div>
              <div className="text-white text-xs font-semibold">Admin</div>
              <div className="text-green-400 text-[10px]">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-green-900 p-4 overflow-auto">
            <div className="flex items-center gap-2 px-2 py-3 border-b border-green-800">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-700 text-xs font-bold">A</div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">Karachi</div>
                <div className="text-green-300 text-xs leading-tight">WasteWatch AI</div>
              </div>
            </div>
            <nav className="mt-3 space-y-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActiveNav(item.id); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-green-200 hover:bg-green-800 hover:text-white`}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    {item.icon.split("M").filter(Boolean).map((d, i) => (
                      <path key={i} strokeLinecap="round" strokeLinejoin="round" d={"M" + d} />
                    ))}
                  </svg>
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button onClick={() => setMobileSidebarOpen(true)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div>
              <div className="font-semibold text-gray-800">{pageTitle[activeNav].title}</div>
              <div className="text-xs text-gray-500">{pageTitle[activeNav].sub}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveNav("notifications")}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
          </div>
        </div>

        <div className="p-6">

          {/* ── DASHBOARD ── */}
          {activeNav === "dashboard" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Reports", value: reports.length.toString(), change: "+12% from last month", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", iconBg: "bg-green-100", iconColor: "text-green-700" },
                  { label: "Open Reports", value: reports.filter(r => r.status === "Open").length.toString(), change: "Needs attention", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
                  { label: "Resolved Reports", value: reports.filter(r => r.status === "Resolved").length.toString(), change: "+16% from last month", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", iconBg: "bg-blue-100", iconColor: "text-blue-700" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className={`w-10 h-10 rounded-full ${stat.iconBg} flex items-center justify-center mb-3`}>
                      <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        {stat.icon.split("M").filter(Boolean).map((d, i) => <path key={i} strokeLinecap="round" strokeLinejoin="round" d={"M" + d} />)}
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                    <div className="text-xs text-green-600 font-medium mt-1">{stat.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3 col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">Karachi Waste Reports</span>
                    <button onClick={() => setActiveNav("map")} className="text-xs text-green-700 font-medium hover:underline">Full Map</button>
                  </div>
                  <MapSvg />
                </div>

                <div className="md:col-span-2 col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">Recent Reports</span>
                    <button onClick={() => setActiveNav("reports")} className="text-xs text-green-700 font-medium hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {["ID","Type","Sev","Status"].map(h => <th key={h} className="px-3 py-2 text-left text-gray-500 font-medium">{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {reports.slice(0, 5).map(r => (
                          <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { setActiveNav("reports"); setSelectedReport(r.id); }}>
                            <td className="px-3 py-2 font-medium text-gray-700">{r.id}</td>
                            <td className="px-3 py-2 text-gray-600">{r.type}</td>
                            <td className={`px-3 py-2 ${sevBadge(r.severity)}`}>{r.severity}</td>
                            <td className="px-3 py-2"><span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusBadge(r.status)}`}>{r.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                    <span className="font-semibold text-sm text-gray-800">Recent Notifications</span>
                  </div>
                  <button onClick={() => setActiveNav("notifications")} className="text-xs text-green-700 font-medium hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {notifications.slice(0, 4).map(n => (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read ? "bg-blue-50/30" : ""}`}>
                      <div className={`w-8 h-8 rounded-full ${n.color} flex items-center justify-center text-sm shrink-0`}>{n.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-800">{n.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{n.desc}</div>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {activeNav === "reports" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder="Search by ID, location, type..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-green-500 w-56"
                />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-green-500 bg-white">
                  {["All","Open","Assigned","In Progress","Resolved"].map(s => <option key={s}>{s}</option>)}
                </select>
                <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-green-500 bg-white">
                  {["All","High","Medium","Low"].map(s => <option key={s}>{s}</option>)}
                </select>
                <span className="text-xs text-gray-400">{filteredReports.length} results</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Table */}
                <div className="md:col-span-3 col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["ID","Type","Severity","Status","Location","Date"].map(h => <th key={h} className="px-3 py-2.5 text-left text-gray-500 font-medium">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map(r => (
                        <tr
                          key={r.id}
                          onClick={() => setSelectedReport(selectedReport === r.id ? null : r.id)}
                          className={`border-b border-gray-50 cursor-pointer transition-colors ${selectedReport === r.id ? "bg-green-50" : "hover:bg-gray-50"}`}
                        >
                          <td className="px-3 py-2.5 font-medium text-green-700">{r.id}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.type}</td>
                          <td className={`px-3 py-2.5 ${sevBadge(r.severity)}`}>{r.severity}</td>
                          <td className="px-3 py-2.5"><span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusBadge(r.status)}`}>{r.status}</span></td>
                          <td className="px-3 py-2.5 text-gray-500">{r.location}</td>
                          <td className="px-3 py-2.5 text-gray-400">{r.date}</td>
                        </tr>
                      ))}
                      {filteredReports.length === 0 && (
                        <tr><td colSpan={6} className="text-center py-8 text-xs text-gray-400">No reports match your filters</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Detail panel */}
                <div className="col-span-2">
                  {selectedReport ? (() => {
                    const r = reports.find(x => x.id === selectedReport)!;
                    return (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                          <span className="font-semibold text-sm text-gray-800">{r.id}</span>
                          <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                          </button>
                        </div>
                        <div className="p-4 space-y-3">
                          <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=160&fit=crop&auto=format" className="w-full h-28 object-cover rounded-lg" alt="Report" />
                          {[["Type", r.type], ["Severity", r.severity], ["Location", r.location], ["Date", r.date]].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-xs">
                              <span className="text-gray-500">{k}</span>
                              <span className="font-medium text-gray-800">{v}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-xs items-center">
                            <span className="text-gray-500">Status</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                          </div>
                          <div className="pt-2 space-y-2">
                            <div className="text-xs font-semibold text-gray-600 mb-1">Update Status</div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {(["Open","Assigned","In Progress","Resolved"] as ReportStatus[]).map(s => (
                                <button
                                  key={s}
                                  onClick={() => updateReportStatus(r.id, s)}
                                  className={`py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${r.status === s ? "bg-green-700 text-white border-green-700" : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"}`}
                                >{s}</button>
                              ))}
                            </div>
                            <button
                              onClick={() => deleteReport(r.id)}
                              className="w-full mt-1 py-1.5 text-[10px] font-medium rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                            >Delete Report</button>
                          </div>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>
                      </div>
                      <p className="text-xs text-gray-400">Click a report to view details and update status</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── MAP ── */}
          {activeNav === "map" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {[["High Severity","3","text-red-600 bg-red-50"],["Medium Severity","3","text-orange-600 bg-orange-50"],["Low Severity","4","text-green-600 bg-green-50"],["Total Pins","10","text-gray-700 bg-gray-100"]].map(([l,v,cls]) => (
                  <div key={l} className={`rounded-xl px-4 py-3 ${cls.split(" ")[1]} border border-gray-200`}>
                    <div className={`text-lg font-bold ${cls.split(" ")[0]}`}>{v}</div>
                    <div className="text-xs text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-800">Karachi Waste Map</span>
                  <div className="flex gap-2">
                    {["Satellite","Streets","Hybrid"].map(v => (
                      <button key={v} className="px-2.5 py-1 text-[10px] border border-gray-200 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors">{v}</button>
                    ))}
                  </div>
                </div>
                <MapSvg />
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {activeNav === "analytics" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="font-semibold text-sm text-gray-800 mb-4">Reports by Type</div>
                  <BarChart data={[
                    { label: "Garbage",  value: 58, color: "#22c55e" },
                    { label: "Dumping",  value: 24, color: "#f97316" },
                    { label: "Overflow", value: 18, color: "#3b82f6" },
                  ]} />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="font-semibold text-sm text-gray-800 mb-4">Reports by Severity</div>
                  <BarChart data={[
                    { label: "High",   value: 42, color: "#ef4444" },
                    { label: "Medium", value: 35, color: "#f97316" },
                    { label: "Low",    value: 23, color: "#22c55e" },
                  ]} />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="font-semibold text-sm text-gray-800 mb-4">Weekly Reports (Last 7 Days)</div>
                <BarChart data={[
                  { label: "Mon", value: 12, color: "#16a34a" },
                  { label: "Tue", value: 19, color: "#16a34a" },
                  { label: "Wed", value: 8,  color: "#16a34a" },
                  { label: "Thu", value: 24, color: "#16a34a" },
                  { label: "Fri", value: 17, color: "#16a34a" },
                  { label: "Sat", value: 31, color: "#16a34a" },
                  { label: "Sun", value: 14, color: "#16a34a" },
                ]} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Avg. Resolution Time", value: "4.2 hrs", sub: "Down 18% this week" },
                  { label: "AI Detection Accuracy", value: "94.2%", sub: "YOLOv11 model" },
                  { label: "Citizen Engagement", value: "1,284", sub: "Active reporters this month" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-xl font-bold text-green-700">{s.value}</div>
                    <div className="text-xs font-semibold text-gray-700 mt-1">{s.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── HOTSPOTS ── */}
          {activeNav === "hotspots" && (
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-orange-700">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                3 hotspot areas detected with 3+ open high-severity reports. Immediate attention recommended.
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { area: "Gulshan-e-Iqbal", open: 5, high: 4, trend: "↑ Worsening", color: "border-red-300 bg-red-50" },
                  { area: "North Karachi",   open: 4, high: 3, trend: "→ Stable",     color: "border-orange-300 bg-orange-50" },
                  { area: "Nazimabad",       open: 3, high: 2, trend: "↓ Improving",  color: "border-yellow-300 bg-yellow-50" },
                  { area: "Korangi",         open: 2, high: 1, trend: "↓ Improving",  color: "border-green-300 bg-green-50" },
                  { area: "Clifton",         open: 1, high: 0, trend: "↓ Improving",  color: "border-green-200 bg-green-50" },
                ].map(h => (
                  <div key={h.area} className={`bg-white rounded-xl border ${h.color} p-4 flex items-center gap-4`}>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800">{h.area}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{h.open} open reports · {h.high} high severity</div>
                    </div>
                    <div className="text-xs font-medium text-gray-600">{h.trend}</div>
                    <button
                      onClick={() => setActiveNav("reports")}
                      className="px-3 py-1.5 bg-green-700 text-white text-xs font-medium rounded-lg hover:bg-green-800 transition-colors"
                    >View Reports</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {activeNav === "users" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">All Users ({users.length})</span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Name","Email","Role","Reports","Status","Action"].map(h => <th key={h} className="px-4 py-2.5 text-left text-gray-500 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-[10px]">{u.name[0]}</div>
                          <span className="font-medium text-gray-800">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${u.role === "Inspector" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{u.reports}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border transition-colors ${u.status === "Active" ? "border-red-200 text-red-500 hover:bg-red-50" : "border-green-200 text-green-600 hover:bg-green-50"}`}
                        >{u.status === "Active" ? "Deactivate" : "Activate"}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeNav === "notifications" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{unreadCount} unread</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-green-700 font-medium hover:underline">Mark all as read</button>
                )}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-50 overflow-hidden">
                {notifications.length === 0 && (
                  <div className="py-12 text-center text-xs text-gray-400">No notifications</div>
                )}
                {notifications.map(n => (
                  <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read ? "bg-blue-50/40" : ""}`}>
                    <div className={`w-9 h-9 rounded-full ${n.color} flex items-center justify-center text-sm shrink-0`}>{n.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-800">{n.title}</span>
                        {!n.read && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{n.desc}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{n.time}</div>
                    </div>
                    <button onClick={() => dismissNotification(n.id)} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeNav === "settings" && (
            <div className="space-y-4 max-w-2xl">
              {settingsSaved && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-700 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  Settings saved successfully!
                </div>
              )}

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-800">AI & Detection</div>
                <div className="p-4 space-y-4">
                  {[
                    { key: "aiDetection", label: "AI Waste Detection", sub: "Automatically analyze uploaded photos using YOLOv11" },
                    { key: "autoAssign",  label: "Auto-assign Reports", sub: "Automatically assign open reports to available field workers" },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                      </div>
                      <button
                        onClick={() => setSettings(s => ({ ...s, [key]: !s[key as keyof typeof s] }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${settings[key as keyof typeof settings] ? "bg-green-600" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings[key as keyof typeof settings] ? "translate-x-5" : "translate-x-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-800">Alerts & Notifications</div>
                <div className="p-4 space-y-4">
                  {[
                    { key: "emailAlerts", label: "Email Alerts", sub: "Send email notifications for high-severity reports" },
                    { key: "smsAlerts",   label: "SMS Alerts",   sub: "Send SMS alerts to field workers on assignment" },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                      </div>
                      <button
                        onClick={() => setSettings(s => ({ ...s, [key]: !s[key as keyof typeof s] }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${settings[key as keyof typeof settings] ? "bg-green-600" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings[key as keyof typeof settings] ? "translate-x-5" : "translate-x-1"}`} />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Hotspot Threshold</div>
                      <div className="text-xs text-gray-500 mt-0.5">Alert when an area exceeds this many open reports</div>
                    </div>
                    <input
                      type="number" min="1" max="20" value={settings.reportThreshold}
                      onChange={e => setSettings(s => ({ ...s, reportThreshold: e.target.value }))}
                      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center text-gray-700 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-800">Data Retention</div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Retain resolved reports for</div>
                      <div className="text-xs text-gray-500 mt-0.5">Reports older than this will be archived</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number" min="30" max="365" value={settings.retentionDays}
                        onChange={e => setSettings(s => ({ ...s, retentionDays: e.target.value }))}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center text-gray-700 focus:outline-none focus:border-green-500"
                      />
                      <span className="text-xs text-gray-500">days</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={saveSettings}
                className="bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-green-800 transition-colors"
              >Save Settings</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
