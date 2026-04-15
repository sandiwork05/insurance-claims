import { useEffect, useState } from 'react';
import { FileCheck, Clock, AlertCircle, DollarSign, Search, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { LucideIcon } from 'lucide-react';

const claimTypes = [
  { name: 'Auto', value: 45, color: '#3b82f6' },
  { name: 'Home', value: 30, color: '#10b981' },
  { name: 'Health', value: 15, color: '#f59e0b' },
  { name: 'Life', value: 10, color: '#8b5cf6' },
];

const claims = [
  { id: 'CLM-2024-001', policyholder: 'Emma Wilson', type: 'Auto', amount: 3400, status: 'Approved', date: '2024-03-10' },
  { id: 'CLM-2024-002', policyholder: 'Liam Brown', type: 'Home', amount: 12500, status: 'Pending', date: '2024-03-09' },
  { id: 'CLM-2024-003', policyholder: 'Olivia Davis', type: 'Health', amount: 1800, status: 'Approved', date: '2024-03-08' },
  { id: 'CLM-2024-004', policyholder: 'Noah Miller', type: 'Auto', amount: 2100, status: 'Under Review', date: '2024-03-07' },
  { id: 'CLM-2024-005', policyholder: 'Ava Garcia', type: 'Life', amount: 50000, status: 'Approved', date: '2024-03-06' },
];

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
}

const StatCard = ({ icon: Icon, label, value, sub }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-500">{label}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Approved: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    'Under Review': 'bg-blue-100 text-blue-700',
    Rejected: 'bg-red-100 text-red-700',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
};

function App() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Insurance Claims System';
  }, []);

  const filteredClaims = claims.filter((c) => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch =
      searchTerm === '' ||
      c.policyholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">InsureClaim</h1>
              <p className="text-xs text-gray-500">Claims Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search claims..."
                className="bg-transparent text-sm outline-none w-40"
                aria-label="Search claims"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium text-sm" aria-label="User avatar">SV</div>
          </div>
        </div>
      </header>

      <main className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Claims Dashboard</h2>
          <p className="text-gray-500">Overview of claims status and analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={FileCheck} label="Total Claims" value="1,245" sub="+4% from last month" />
          <StatCard icon={DollarSign} label="Total Payout" value="$4.2M" sub="YTD processed" />
          <StatCard icon={Clock} label="Pending" value="38" sub="Avg 2.4 days" />
          <StatCard icon={AlertCircle} label="Under Review" value="12" sub="Requires attention" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Claims by Type</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={claimTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {claimTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {claimTypes.map((t) => (
                <div key={t.name} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} aria-hidden="true" />
                  {t.name}
                </div>
              ))}
            </div>
          </div>

          {/* Claims Table */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Claims</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" aria-hidden="true" />
                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none"
                >
                  <option>All</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Claim ID</th>
                    <th className="pb-3 font-medium">Policyholder</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClaims.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No claims match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredClaims.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="py-3 font-mono text-gray-700">{c.id}</td>
                        <td className="py-3 font-medium text-gray-900">{c.policyholder}</td>
                        <td className="py-3 text-gray-600">{c.type}</td>
                        <td className="py-3 text-gray-900">${c.amount.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(c.status)}`}>{c.status}</span>
                        </td>
                        <td className="py-3 text-gray-500">{c.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
