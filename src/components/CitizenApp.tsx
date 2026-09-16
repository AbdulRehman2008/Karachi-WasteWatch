import { useState } from "react";

type Screen = "home" | "report" | "analysis" | "status" | "map" | "profile" | "signin" | "signup";

type User = { name: string; email: string };

const BOTTOM_NAV = [
  { label: "Home", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", nav: "home" },
  { label: "Map", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", nav: "map" },
  { label: "Reports", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", nav: "status" },
  { label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", nav: "profile" },
] as const;

const KARACHI_IMG = "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=200&fit=crop&auto=format";

const statusSteps = [
  { label: "Report Submitted", time: "14 Sep 2026, 06:42 PM", done: true },
  { label: "AI Analyzed", time: "14 Sep 2026, 06:43 PM", done: true },
  { label: "Verified", time: "14 Sep 2026, 06:30 PM", done: true },
  { label: "Assigned", time: "14 Sep 2026, 07:10 PM", done: true },
  { label: "In Progress", time: "", done: false, active: true },
  { label: "Resolved", time: "", done: false },
];

const mapPins = [
  { x: 48, y: 30, sev: "high" },
  { x: 62, y: 38, sev: "high" },
  { x: 35, y: 45, sev: "medium" },
  { x: 70, y: 52, sev: "low" },
  { x: 28, y: 60, sev: "high" },
  { x: 55, y: 62, sev: "medium" },
  { x: 42, y: 72, sev: "low" },
  { x: 78, y: 40, sev: "medium" },
];

const sevColor = { high: "#ef4444", medium: "#f97316", low: "#22c55e" };

function BottomNav({ screen, setScreen }: { screen: Screen; setScreen: (s: Screen) => void }) {
  return (
    <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-around md:hidden">
      {BOTTOM_NAV.map((item) => (
        <button
          key={item.label}
          onClick={() => setScreen(item.nav as Screen)}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 ${screen === item.nav ? "text-green-700" : "text-gray-400"}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function CitizenApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [user, setUser] = useState<User | null>({ name: "Ahmed Raza", email: "ahmed.raza@gmail.com" });
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPass, setSignInPass] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (signInEmail && signInPass) {
      setUser({ name: signInEmail.split("@")[0], email: signInEmail });
      setScreen("profile");
    }
  }

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (signUpName && signUpEmail && signUpPass) {
      setUser({ name: signUpName, email: signUpEmail });
      setScreen("profile");
    }
  }

  function handleSignOut() {
    setUser(null);
    setSignInEmail("");
    setSignInPass("");
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPass("");
    setScreen("signin");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl px-4">
        {/* Phone shell (mobile) / responsive container (md+) */}
        <div className="bg-white rounded-3xl shadow-2xl md:rounded-xl md:shadow-sm overflow-hidden border border-gray-200 min-h-[680px] md:min-h-0">


          {/* Screen content */}
          <div className="flex flex-col min-h-[580px] md:min-h-0">
            {/* HOME */}
            {screen === "home" && (
              <div className="flex flex-col flex-1">
                {/* Header */}
                <div className="bg-green-800 px-4 pt-3 pb-4">
                  <div className="rounded-xl overflow-hidden mb-3">
                    <img src={KARACHI_IMG} alt="Karachi cityscape" className="w-full h-28 md:h-36 object-cover" />
                    <div className="bg-green-700 px-3 py-2">
                      <div className="text-white font-bold text-sm leading-snug">Cleaner Karachi,<br />Healthier Tomorrow</div>
                      <div className="text-green-200 text-xs mt-0.5">Report waste, help your city, make a difference.</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 flex-1 pt-20 pb-20 px-4 md:pt-6 md:pb-6 md:px-6">                  <button
                    onClick={() => setScreen("report")}
                    className="w-full flex items-center gap-3 bg-green-700 text-white rounded-xl px-4 py-3 hover:bg-green-800 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Report Waste</div>
                      <div className="text-green-200 text-xs">Take a photo or upload</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setScreen("status")}
                    className="w-full flex items-center gap-3 bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">View My Reports</div>
                      <div className="text-gray-500 text-xs">Check status of your reports</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Learn & Help</div>
                      <div className="text-gray-500 text-xs">Waste management guidelines</div>
                    </div>
                  </button>
                </div>

                <div className="md:hidden">
                  <BottomNav screen={screen} setScreen={setScreen} />
                </div>
              </div>
            )}

            {/* REPORT */}
            {screen === "report" && (
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <button onClick={() => setScreen("home")} className="text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <span className="font-semibold text-gray-800">Report Waste</span>
                </div>

                <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
                  {/* Photo area */}
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 h-40 md:h-56">
                    <img
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop&auto=format"
                      alt="Reported waste pile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => { setShowAnalysis(true); setScreen("analysis"); }}
                      className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-2">
                      <button className="flex-1 bg-black/60 text-white text-xs py-1.5 rounded-lg flex items-center justify-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                        Retake Photo
                      </button>
                      <button className="flex-1 bg-black/60 text-white text-xs py-1.5 rounded-lg flex items-center justify-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        Choose from Gallery
                      </button>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-700 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <div>
                        <div className="text-xs font-semibold text-gray-700">Location</div>
                        <div className="text-xs text-gray-600">Karachi, Pakistan</div>
                        <div className="text-[10px] text-gray-400">Lat: 24.86807  Lon: 67.0011</div>
                      </div>
                      <svg className="w-4 h-4 text-green-600 ml-auto shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Description <span className="font-normal text-gray-400">(optional)</span></label>
                    <input type="text" placeholder="Add any additional details..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white focus:outline-none focus:border-green-500" />
                  </div>

                  {/* Problem Type */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Problem Type</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:border-green-500 appearance-none">
                      <option>Garbage (detected by AI)</option>
                      <option>Illegal Dumping</option>
                      <option>Overflow</option>
                    </select>
                  </div>

                  {/* Severity */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Severity</label>
                    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">● High</span>
                        <span className="text-xs text-gray-500">(detected by AI)</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>

                  <button
                    onClick={() => setScreen("analysis")}
                    className="w-full bg-green-700 text-white font-semibold text-sm py-3 rounded-xl hover:bg-green-800 transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}

            {/* AI ANALYSIS */}
            {screen === "analysis" && (
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <button onClick={() => setScreen("report")} className="text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <span className="font-semibold text-gray-800">AI Analysis Result</span>
                </div>

                <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
                  {/* Detected image */}
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop&auto=format"
                      alt="Waste detection result"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="border-2 border-red-500 rounded px-2 py-0.5">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1 rounded">Garbage 94.2%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setScreen("report")}
                      className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>

                  {/* Detection results */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-700">Detection Results</span>
                    </div>
                    {[
                      { label: "Detected Class", value: "Garbage", badge: null },
                      { label: "Confidence", value: "94.2%", badge: null },
                      { label: "Severity", value: null, badge: "High" },
                      { label: "Model Used", value: "YOLOv11 (Waste Detection)", badge: null },
                      { label: "Inference Time", value: "82 ms", badge: null },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-4 py-2 border-b border-gray-50 last:border-0">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        {row.badge ? (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">● {row.badge}</span>
                        ) : (
                          <span className="text-xs font-medium text-gray-800">{row.value}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Success message */}
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-800">Waste detected successfully!</div>
                      <div className="text-xs text-green-700 mt-0.5">Your report has been submitted and will be reviewed by the authorities.</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setScreen("status")}
                    className="w-full bg-green-700 text-white font-semibold text-sm py-3 rounded-xl hover:bg-green-800 transition-colors"
                  >
                    Track Report Status
                  </button>
                </div>
              </div>
            )}

            {/* STATUS */}
            {screen === "status" && (
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <button onClick={() => setScreen("home")} className="text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <span className="font-semibold text-gray-800">Report Status</span>
                </div>

                <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
                  {/* Report card */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-start gap-3 p-3">
                      <img
                        src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=80&h=80&fit=crop&auto=format"
                        alt="Report thumbnail"
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-sm text-gray-800">Report #KW-000124</div>
                        <div className="text-xs text-gray-500">Garbage</div>
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 inline-flex items-center gap-1">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5v6l4 2-1.72 3.28L10 14V5h2zm0-4C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1z"/></svg>
                          High
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 px-3 py-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        Gulshan-e-Iqbal, Karachi
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Reported on 14 Sep 2026, 06:42 PM
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="space-y-0">
                      {statusSteps.map((step, i) => (
                        <div key={step.label} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              step.done ? "bg-green-600" : step.active ? "bg-white border-2 border-green-600" : "bg-white border-2 border-gray-200"
                            }`}>
                              {step.done && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                              )}
                              {step.active && <div className="w-2 h-2 rounded-full bg-green-600" />}
                            </div>
                            {i < statusSteps.length - 1 && (
                              <div className={`w-0.5 h-7 ${step.done ? "bg-green-600" : "bg-gray-200"}`} />
                            )}
                          </div>
                          <div className="pt-0.5 pb-6">
                            <div className={`text-xs font-semibold ${step.done || step.active ? "text-gray-800" : "text-gray-400"}`}>
                              {step.label}
                            </div>
                            {step.time && <div className="text-[10px] text-gray-400 mt-0.5">{step.time}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <BottomNav screen={screen} setScreen={setScreen} />
              </div>
            )}

            {/* MAP */}
            {screen === "map" && (
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <button onClick={() => setScreen("home")} className="text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <span className="font-semibold text-gray-800">Waste Map</span>
                  <button className="ml-auto text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>
                  </button>
                </div>

                <div className="flex-1 relative">
                  {/* Stylized map */}
                  <svg viewBox="0 0 100 80" className="w-full h-full" style={{ minHeight: 380 }}>
                    <rect width="100" height="80" fill="#e5e7eb" />
                    {/* Water */}
                    <ellipse cx="75" cy="65" rx="30" ry="20" fill="#bfdbfe" opacity="0.7" />
                    {/* Road grid */}
                    {[20,35,50,65].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="1.5" />)}
                    {[15,30,45,60,75].map(x => <line key={x} x1={x} y1="0" x2={x} y2="80" stroke="white" strokeWidth="1.5" />)}
                    {/* Areas */}
                    <rect x="20" y="15" width="25" height="18" fill="#d1fae5" rx="2" />
                    <text x="32" y="27" textAnchor="middle" fontSize="3.5" fill="#065f46" fontFamily="Inter">Gulshan-e-Iqbal</text>
                    <rect x="50" y="32" width="22" height="16" fill="#dcfce7" rx="2" />
                    <text x="61" y="41" textAnchor="middle" fontSize="3.5" fill="#065f46" fontFamily="Inter">Korangi</text>
                    <text x="35" y="10" textAnchor="middle" fontSize="4" fill="#374151" fontFamily="Inter" fontWeight="600">North Karachi</text>
                    <text x="20" y="52" textAnchor="middle" fontSize="3.5" fill="#374151" fontFamily="Inter">Nazimabad</text>
                    <text x="65" y="62" textAnchor="middle" fontSize="3.5" fill="#1d4ed8" fontFamily="Inter">Karachi</text>
                    <text x="40" y="68" textAnchor="middle" fontSize="3" fill="#374151" fontFamily="Inter">Clifton</text>

                    {/* Pins */}
                    {mapPins.map((pin, i) => (
                      <g key={i}>
                        <circle cx={pin.x} cy={pin.y} r="3.5" fill={sevColor[pin.sev as keyof typeof sevColor]} opacity="0.9" />
                        <circle cx={pin.x} cy={pin.y} r="1.5" fill="white" />
                      </g>
                    ))}

                    {/* Popup card */}
                    <rect x="50" y="5" width="46" height="22" rx="2" fill="white" />
                    <image href="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=60&h=60&fit=crop&auto=format" x="52" y="7" width="10" height="10" clipPath="url(#clip1)" />
                    <clipPath id="clip1"><rect x="52" y="7" width="10" height="10" rx="1" /></clipPath>
                    <text x="64" y="11" fontSize="3" fill="#111827" fontFamily="Inter" fontWeight="600">Report #KW-000124</text>
                    <rect x="64" y="12" width="14" height="3.5" rx="1" fill="#fee2e2" />
                    <text x="71" y="14.5" textAnchor="middle" fontSize="2.5" fill="#dc2626" fontFamily="Inter" fontWeight="600">● High</text>
                    <text x="64" y="19" fontSize="2.5" fill="#6b7280" fontFamily="Inter">Gulshan-e-Iqbal, Karachi</text>
                    <text x="64" y="23" fontSize="2" fill="#9ca3af" fontFamily="Inter">14 Sep 2026, 06:42 PM</text>
                    <text x="93" y="10" fontSize="4" fill="#6b7280" fontFamily="Inter">›</text>
                  </svg>

                  {/* Controls */}
                  <div className="absolute right-3 bottom-16 flex flex-col gap-1">
                    <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-700 text-lg font-light">+</button>
                    <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-700 text-lg font-light">−</button>
                    <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>

                  {/* Map Legend */}
                  <div className="absolute left-3 bottom-16 bg-white rounded-lg shadow px-2 py-1.5 space-y-1">
                    {[["High", "#ef4444"],["Medium","#f97316"],["Low","#22c55e"]].map(([l,c]) => (
                      <div key={l} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                        <span className="text-[10px] text-gray-600">{l} Severity</span>
                      </div>
                    ))}
                  </div>
                </div>

                <BottomNav screen={screen} setScreen={setScreen} />
              </div>
            )}
            {/* PROFILE */}
            {screen === "profile" && (
              <div className="flex flex-col flex-1">
                {user ? (
                  <>
                    <div className="bg-green-800 px-4 pt-5 pb-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mb-2">
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      </div>
                      <div className="text-white font-bold text-base">{user.name}</div>
                      <div className="text-green-200 text-xs mt-0.5">{user.email}</div>
                      <div className="mt-2 flex gap-2">
                        <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Citizen Reporter</span>
                        <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-semibold px-2 py-0.5 rounded-full">⭐ Top Contributor</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                      {[["14", "Reports"], ["11", "Resolved"], ["3", "Pending"]].map(([val, label]) => (
                        <div key={label} className="flex flex-col items-center py-3">
                          <span className="text-green-700 font-bold text-lg leading-none">{val}</span>
                          <span className="text-gray-500 text-[10px] mt-0.5">{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 space-y-2.5 flex-1">
                      {[
                        { label: "Phone", value: "+92 300 1234567", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                        { label: "Area", value: "Gulshan-e-Iqbal, Karachi", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
                        { label: "Member since", value: "January 2025", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                      ].map(({ label, value, icon }) => (
                        <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={icon}/></svg>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400 leading-none">{label}</div>
                            <div className="text-xs font-medium text-gray-800 mt-0.5">{value}</div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 rounded-xl py-2.5 text-xs font-semibold hover:bg-red-50 transition-colors mt-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1 px-6 py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <svg className="w-9 h-9 text-green-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Sign in to your account</div>
                    <div className="text-xs text-gray-500 mb-5 text-center">Track your reports and contribute to a cleaner Karachi.</div>
                    <button onClick={() => { setAuthTab("signin"); setScreen("signin"); }} className="w-full bg-green-700 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-green-800 transition-colors mb-2">Sign In</button>
                    <button onClick={() => { setAuthTab("signup"); setScreen("signup"); }} className="w-full border border-green-700 text-green-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-green-50 transition-colors">Create Account</button>
                  </div>
                )}
                <BottomNav screen={screen} setScreen={setScreen} />
              </div>
            )}

            {/* SIGN IN / SIGN UP */}
            {(screen === "signin" || screen === "signup") && (
              <div className="flex flex-col flex-1">
                <div className="bg-green-800 px-4 pt-5 pb-5 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5" /></svg>
                  </div>
                  <div className="text-white font-bold text-sm">Karachi WasteWatch AI</div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setScreen("signin")}
                    className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${screen === "signin" ? "border-green-700 text-green-700" : "border-transparent text-gray-400"}`}
                  >Sign In</button>
                  <button
                    onClick={() => setScreen("signup")}
                    className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${screen === "signup" ? "border-green-700 text-green-700" : "border-transparent text-gray-400"}`}
                  >Create Account</button>
                </div>

                <div className="px-5 py-5 flex-1">
                  {screen === "signin" ? (
                    <form onSubmit={handleSignIn} className="space-y-3">
                      <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Email</label>
                        <input
                          type="email" required value={signInEmail} onChange={e => setSignInEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Password</label>
                        <input
                          type="password" required value={signInPass} onChange={e => setSignInPass(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <div className="text-right">
                        <button type="button" className="text-[10px] text-green-700 font-medium">Forgot password?</button>
                      </div>
                      <button type="submit" className="w-full bg-green-700 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-green-800 transition-colors">Sign In</button>
                      <p className="text-center text-[10px] text-gray-500 mt-2">
                        {"Don't have an account? "}
                        <button type="button" onClick={() => setScreen("signup")} className="text-green-700 font-semibold">Sign up</button>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleSignUp} className="space-y-3">
                      <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Full Name</label>
                        <input
                          type="text" required value={signUpName} onChange={e => setSignUpName(e.target.value)}
                          placeholder="Ahmed Raza"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Email</label>
                        <input
                          type="email" required value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Password</label>
                        <input
                          type="password" required value={signUpPass} onChange={e => setSignUpPass(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <button type="submit" className="w-full bg-green-700 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-green-800 transition-colors">Create Account</button>
                      <p className="text-center text-[10px] text-gray-500 mt-2">
                        Already have an account?{" "}
                        <button type="button" onClick={() => setScreen("signin")} className="text-green-700 font-semibold">Sign in</button>
                      </p>
                    </form>
                  )}
                </div>

                <div className="px-5 pb-5">
                  <button onClick={() => setScreen("home")} className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors">← Back to Home</button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
