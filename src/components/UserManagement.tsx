import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  UserMinus, 
  Mail, 
  Phone, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { Card, Badge, Button } from './Common';
import { MOCK_USERS } from '../constants';
import { User, Role } from '../types';

export const UserManagement: React.FC = () => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'All Users', count: 12450, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Our Students', count: 10200, icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Campus Staff', count: 1850, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Administrators', count: 400, icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.idNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Institutional Directory</h2>
          <p className="text-slate-500 text-sm mt-1">Manage institutional access, roles, and communication profiles.</p>
        </div>
        <Button className="h-11 shadow-sm px-6">
          <UserPlus size={18} className="mr-2" />
          Enroll New Member
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card 
            key={i} 
            className="h-24 hover:shadow-md transition-all" 
            borderLeft={
              stat.label === 'All Users' ? 'border-blue-500' :
              stat.label === 'Our Students' ? 'border-[#f97316]' :
              stat.label === 'Campus Staff' ? 'border-green-500' : 'border-purple-500'
            }
          >
            <div className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded bg-slate-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold mb-0.5 tracking-widest">{stat.label}</div>
                <h2 className="text-xl font-bold text-slate-800 leading-none">{stat.count.toLocaleString()}</h2>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-white p-2 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-2 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded flex-1">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID number, or department..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1e3a5f] bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors uppercase tracking-wider">
              <Filter size={14} /> Role: All
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1e3a5f] bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors uppercase tracking-wider">
               Status: Active
            </button>
          </div>
        </div>

        <Card title="Database Records" className="p-0 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">User Details</th>
                  <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Access Role</th>
                  <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Institutional Dept</th>
                  <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest">Account Status</th>
                  <th className="px-6 py-3 font-bold text-slate-400 text-[11px] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600 font-sans">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-xs ring-4 ring-[#1e3a5f]/5">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{user.name}</div>
                          <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-0.5">{user.idNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{user.role}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1"><Mail size={12}/> {user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{user.department}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1"><Phone size={12}/> {user.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={
                        user.status === 'Active' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-slate-50 text-slate-400'
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-[#1e3a5f] hover:bg-slate-50 transition-all rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded">
                          <UserMinus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Records: <span className="text-slate-900">{filteredUsers.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded border border-slate-200 hover:bg-white text-slate-400 hover:text-slate-700 transition-all">
                <ChevronLeft size={16} />
              </button>
              <div className="px-3 py-1 font-bold text-xs bg-[#1e3a5f] text-white rounded shadow-sm">1</div>
              <button className="p-1.5 rounded border border-slate-200 hover:bg-white text-slate-400 hover:text-slate-700 transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
