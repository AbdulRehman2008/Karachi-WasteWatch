import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // Simple mock authentication: accept admin@site.test / admin
    if (email === "admin@site.test" && password === "admin") {
      // mark logged in (simple): store a flag in sessionStorage
      sessionStorage.setItem("isAdmin", "1");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin@site.test / admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin Login</h2>
        <p className="text-xs text-gray-500 mb-4">Sign in with the admin account to access the dashboard.</p>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-[12px] text-gray-600 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@site.test"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-[12px] text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md text-sm">Sign in</button>
            <button type="button" onClick={() => { setEmail('admin@site.test'); setPassword('admin'); }} className="text-xs text-gray-500 hover:underline">Fill demo</button>
          </div>
        </form>
        <div className="text-xs text-gray-400 mt-4">Demo credentials: admin@site.test / admin</div>
      </div>
    </div>
  );
}
