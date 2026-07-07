import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Award
} from 'lucide-react';
import { Card } from '../components/Common';
import { CHART_DATA_DELIVERY } from '../constants';

const ACK_DATA = [
  { category: 'Emergency', rate: 94 },
  { category: 'Academic', rate: 78 },
  { category: 'Health', rate: 82 },
  { category: 'Security', rate: 88 },
  { category: 'General', rate: 65 },
];

const TOP_ALERTS = [
  { type: 'Weather Warnings', count: 12, growth: '+15%' },
  { type: 'Exam Schedules', count: 45, growth: '+2%' },
  { type: 'Safety Brroadcasts', count: 28, growth: '+25%' },
  { type: 'IT Maintenance', count: 62, growth: '-5%' },
  { type: 'Health Info', count: 18, growth: '+8%' },
];

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Strategic Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">Deep insights into communication effectiveness and campus engagement.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 rounded border border-slate-200 transition-colors uppercase tracking-wider">
            <TrendingUp size={14} /> Intelligence Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Delivery Rate', value: '99.2%', color: 'border-blue-500', trend: '+0.5%' },
          { label: 'Avg Ack Time', value: '4.2m', color: 'border-[#f97316]', trend: '-1.2m' },
          { label: 'Total Reach', value: '1.2M', color: 'border-green-500', trend: '+12%' },
          { label: 'Engagement', value: '74%', color: 'border-purple-500', trend: '+4.5%' },
        ].map((item, i) => (
          <Card key={i} className="h-24 hover:shadow-md transition-all" borderLeft={item.color}>
            <div className="p-4">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest">{item.label}</div>
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold text-slate-800">{item.value}</h2>
                <span className={`text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>{item.trend}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Delivery Reliability Index (30d)">
          <div className="h-[280px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA_DELIVERY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis 
                  domain={[90, 100]}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#1e3a5f" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Acknowledgement Performance">
          <div className="h-[280px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACK_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="category" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1e3a5f', fontWeight: 'bold', fontSize: 11 }}
                  width={90}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={24}>
                  {ACK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate > 85 ? '#1e3a5f' : entry.rate > 70 ? '#3b82f6' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Category Trends" className="lg:col-span-1 p-0 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {TOP_ALERTS.map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#1e3a5f] flex items-center justify-center text-white text-[10px] font-bold">
                    0{i + 1}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{alert.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">{alert.count}</div>
                  <div className={`text-[10px] font-bold ${alert.growth.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {alert.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Traffic Density Map" className="lg:col-span-2">
           <div className="flex flex-col h-[220px] justify-between mt-6">
              {[0, 1, 2, 3, 4].map(row => (
                <div key={row} className="flex gap-1.5 h-full">
                   {[...Array(12)].map((_, col) => {
                      const opacity = Math.random();
                      return (
                        <div 
                          key={col} 
                          className="flex-1 rounded-sm transition-all hover:ring-2 hover:ring-[#f97316] cursor-pointer"
                          style={{ backgroundColor: `rgba(30, 58, 95, ${opacity * 0.8 + 0.1})` }}
                        ></div>
                      )
                   })}
                </div>
              ))}
              <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                 <span>Jan</span>
                 <span>Mar</span>
                 <span>May</span>
                 <span>Jul</span>
                 <span>Sep</span>
                 <span>Nov</span>
              </div>
           </div>
           <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#1e3a5f]/10"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Low</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#1e3a5f]"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Peak</span>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};
