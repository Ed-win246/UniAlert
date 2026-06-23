import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card, Badge } from './Common';
import { MOCK_ALERTS, CHART_DATA_ALERTS_WEEK, CHART_DATA_CATEGORIES, SEVERITY_COLORS } from '../constants';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#a855f7', '#6b7280'];

export const AdminOverview: React.FC = () => {
  const stats = [
    { label: 'Total Alerts Sent', value: '254', icon: MessageSquare, trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Alerts', value: '5', icon: AlertCircle, trend: 'Stable', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Users Registered', value: '12.4k', icon: Users, trend: '+5%', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Acknowledged', value: '88%', icon: CheckCircle2, trend: '+2.4%', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Systems Overview</h1>
          <p className="text-gray-500 mt-1">Real-time monitoring of Kyambogo campus-wide alerts and engagement.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button className="px-4 py-2 bg-gray-100 font-semibold rounded-lg text-sm">Today</button>
          <button className="px-4 py-2 hover:bg-gray-50 text-gray-500 font-semibold rounded-lg text-sm">Last 7 Days</button>
          <button className="px-4 py-2 hover:bg-gray-50 text-gray-500 font-semibold rounded-lg text-sm">Custom</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card 
            key={i} 
            className="hover:shadow-md transition-all h-28" 
            borderLeft={
              stat.label === 'Total Alerts Sent' ? 'border-[#1e3a5f]' :
              stat.label === 'Active Alerts' ? 'border-[#f97316]' :
              stat.label === 'Users Registered' ? 'border-green-500' : 'border-blue-400'
            }
          >
            <div className="p-5">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest">{stat.label}</div>
              <div className="flex items-end justify-between">
                <h2 className={`text-3xl font-bold ${stat.label === 'Active Alerts' ? 'text-[#f97316]' : 'text-slate-800'}`}>
                  {stat.value}
                </h2>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2" title="Alert Activity (Last 7 Days)">
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA_ALERTS_WEEK}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32}>
                   {CHART_DATA_ALERTS_WEEK.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#f97316' : '#bfdbfe'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Alert Categories">
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CHART_DATA_CATEGORIES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CHART_DATA_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Alerts Table */}
      <Card title="Recent Alerts History" className="overflow-hidden flex flex-col p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Alert Title</th>
                <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Category</th>
                <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Severity</th>
                <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Sent To</th>
                <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Date</th>
                <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {MOCK_ALERTS.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{alert.title}</td>
                  <td className="px-6 py-4">{alert.category}</td>
                  <td className="px-6 py-4">
                    <Badge className={
                      alert.severity === 'Critical' ? 'bg-red-50 text-red-600' : 
                      alert.severity === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                    }>
                      {alert.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{alert.targetAudience}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(alert.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${alert.status === 'Active' ? 'text-green-500' : 'text-slate-400'}`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t bg-slate-50 flex justify-end">
          <button className="text-[#1e3a5f] text-xs font-bold hover:underline">View All Records</button>
        </div>
      </Card>
    </div>
  );
};
