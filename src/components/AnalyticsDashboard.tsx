import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

type AnalyticsTab = "overview" | "byArea" | "byCategory" | "trends" | "hotspots";

const areaData = [
  { area: "Gulshan-e-Iqbal", reports: 420 },
  { area: "Korangi",         reports: 350 },
  { area: "North Karachi",   reports: 290 },
  { area: "Nazimabad",       reports: 210 },
  { area: "Clifton",         reports: 150 },
];

const categoryData = [
  { name: "Garbage",         value: 62, color: "#15803d" },
  { name: "Illegal Dumping", value: 21, color: "#f97316" },
  { name: "Overflow",        value: 11, color: "#3b82f6" },
  { name: "Other",           value: 6,  color: "#d1d5db" },
];

const trendData = [
  { month: "Jan", reports: 380 },
  { month: "Feb", reports: 420 },
  { month: "Mar", reports: 510 },
  { month: "Apr", reports: 480 },
  { month: "May", reports: 620 },
  { month: "Jun", reports: 710 },
];

const hotspots = [
  { area: "Gulshan-e-Iqbal", reports: 428, sev: "High" },
  { area: "Korangi",         reports: 311, sev: "High" },
  { area: "North Karachi",   reports: 184, sev: "Medium" },
  { area: "Nazimabad",       reports: 142, sev: "Medium" },
  { area: "Clifton",         reports: 95,  sev: "Low" },
];

const tabs: { id: AnalyticsTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "byArea", label: "By Area" },
  { id: "byCategory", label: "By Category" },
  { id: "trends", label: "Trends" },
  { id: "hotspots", label: "Hotspots" },
];

const sevBadge = (s: string) =>
  ({ High: "bg-red-100 text-red-700", Medium: "bg-orange-100 text-orange-700", Low: "bg-green-100 text-green-700" })[s] || "bg-gray-100 text-gray-700";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-xs">
        <div className="font-semibold text-gray-700">{label}</div>
        <div className="text-green-700">{payload[0].value} reports</div>
      </div>
    );
  }
  return null;
}

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Waste Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">AI-powered insights and waste reporting patterns</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5">Last 6 Months</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-100 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Area bar chart */}
              <div>
                <div className="font-semibold text-sm text-gray-700 mb-4">Reports by Area</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={areaData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="area" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="reports" fill="#15803d" radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category donut */}
              <div>
                <div className="font-semibold text-sm text-gray-700 mb-4">Reports by Category</div>
                <div className="flex items-center gap-6">
                  <div className="relative" style={{ width: 140, height: 140 }}>
                    <PieChart width={140} height={140}>
                      <Pie
                        data={categoryData}
                        cx={70} cy={70}
                        innerRadius={45} outerRadius={65}
                        dataKey="value"
                        startAngle={90} endAngle={-270}
                      >
                        {categoryData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">62%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {categoryData.map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: c.color }} />
                        <span className="text-xs text-gray-600">{c.name}</span>
                        <span className="text-xs font-semibold text-gray-800 ml-auto">{c.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trend line */}
              <div>
                <div className="font-semibold text-sm text-gray-700 mb-4">Reports Over Time</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="reports" stroke="#15803d" strokeWidth={2.5} dot={{ fill: "#15803d", r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Hotspots */}
              <div>
                <div className="font-semibold text-sm text-gray-700 mb-4">Waste Hotspots</div>
                <div className="space-y-2.5">
                  {hotspots.map((h) => (
                    <div key={h.area} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <span className="text-sm text-gray-700">{h.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{h.reports} reports</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${sevBadge(h.sev)}`}>● {h.sev}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* By Area */}
          {activeTab === "byArea" && (
            <div className="p-5">
              <div className="font-semibold text-sm text-gray-700 mb-4">Reports by Area — Full Detail</div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={areaData} layout="vertical" margin={{ left: 10, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="area" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="reports" fill="#15803d" radius={[0, 4, 4, 0]} label={{ position: "right", fontSize: 12, fill: "#374151" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* By Category */}
          {activeTab === "byCategory" && (
            <div className="p-5 flex items-center justify-center gap-16">
              <div className="relative" style={{ width: 220, height: 220 }}>
                <PieChart width={220} height={220}>
                  <Pie data={categoryData} cx={110} cy={110} innerRadius={65} outerRadius={100} dataKey="value" startAngle={90} endAngle={-270}>
                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">62%</div>
                    <div className="text-xs text-gray-500">Garbage</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded" style={{ background: c.color }} />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.value}% of reports</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trends */}
          {activeTab === "trends" && (
            <div className="p-5">
              <div className="font-semibold text-sm text-gray-700 mb-4">Reports Over Time</div>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="reports" stroke="#15803d" strokeWidth={3} dot={{ fill: "#15803d", r: 5 }} activeDot={{ r: 7, fill: "#15803d" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Hotspots */}
          {activeTab === "hotspots" && (
            <div className="p-5">
              <div className="font-semibold text-sm text-gray-700 mb-4">Waste Hotspots — Ranked</div>
              <div className="space-y-3">
                {hotspots.map((h, i) => (
                  <div key={h.area} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800">{h.area}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{h.reports} total reports</div>
                      <div className="mt-2 bg-gray-200 rounded-full h-1.5 w-full">
                        <div
                          className="h-1.5 rounded-full bg-green-600"
                          style={{ width: `${(h.reports / 428) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sevBadge(h.sev)}`}>● {h.sev}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Detection Example */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <span className="font-semibold text-sm text-gray-800">Detection Example — Image Input → Output</span>
          </div>
          <div className="p-5 flex items-start gap-6 flex-wrap">
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shrink-0" style={{ width: 220 }}>
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop&auto=format"
                alt="AI waste detection example"
                className="w-full object-cover"
                style={{ height: 160 }}
              />
              <div className="absolute top-4 left-4">
                <div className="border-2 border-red-500 rounded px-2 py-0.5 inline-flex">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1 rounded">Garbage 94.2%</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 min-w-[200px]">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Detection Output</div>
              {[
                ["Detected", "Garbage"],
                ["Confidence", "94.2%"],
                ["Severity", "High"],
                ["Model", "YOLOv11"],
                ["Location", "Karachi, Pakistan"],
                ["Inference Time", "82 ms"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">{k}</span>
                  <span className={`text-xs font-semibold ${k === "Severity" ? "text-red-600" : "text-gray-800"}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Chat Assistant (RAG)</div>
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5" /></svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">AI Chat Assistant (RAG)</span>
                </div>
                <div className="bg-green-700 text-white text-xs rounded-xl rounded-tl-none px-3 py-2 max-w-xs self-end ml-auto w-fit">
                  What should I do if I find an illegal dumping site?
                </div>
                <div className="bg-white border border-gray-200 text-xs text-gray-700 rounded-xl rounded-tl-none px-3 py-2 leading-relaxed">
                  If you find an illegal dumping site in Karachi, you can:<br />
                  1. Take a clear photo of the location.<br />
                  2. Report it through the Karachi WasteWatch app.<br />
                  3. Provide the exact location or nearby landmark.<br />
                  4. The concerned authorities will be notified for action.<br /><br />
                  For urgent cases, call Karachi Solid Waste Management Board (KSWMB) at 021-99250106.
                </div>
                <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 bg-white">
                  <input className="flex-1 text-xs text-gray-600 outline-none bg-transparent" placeholder="Type your question..." readOnly />
                  <button className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer card */}
        <div className="bg-green-900 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-green-700"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5" /></svg>
            </div>
            <div>
              <div className="font-bold text-white">Karachi WasteWatch AI</div>
              <div className="text-green-300 text-sm">AI-Powered Waste Detection, Reporting & Monitoring Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: "🏙️", label: "Cleaner City" },
              { icon: "💚", label: "Better Health" },
              { icon: "📊", label: "Data-Driven Decisions" },
              { icon: "🌿", label: "A Greener Karachi" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-green-300 text-xs font-medium leading-tight max-w-[70px] text-center">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-green-400 text-xs text-right">Together for a cleaner and healthier Karachi</div>
        </div>
      </div>
    </div>
  );
}
