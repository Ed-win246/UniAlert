import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle,
  Calendar,
  Send,
  X,
  Megaphone,
  Clock,
  Users
} from 'lucide-react';
import { Card, Badge, Button } from '../components/Common';
import { MOCK_ALERTS, SEVERITY_COLORS, CATEGORY_COLORS } from '../constants';
import { Alert, AlertCategory, AlertSeverity, TargetAudience } from '../types';

export const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [newAlert, setNewAlert] = useState({
    title: '',
    category: 'General' as AlertCategory,
    severity: 'Medium' as AlertSeverity,
    targetAudience: 'All' as TargetAudience,
    message: '',
    channels: ['In-App'] as ('In-App' | 'Email' | 'SMS')[],
    sendTime: 'now' as 'now' | 'schedule'
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const alert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      title: newAlert.title,
      category: newAlert.category,
      severity: newAlert.severity,
      targetAudience: newAlert.targetAudience,
      message: newAlert.message,
      channels: newAlert.channels,
      createdAt: new Date().toISOString(),
      status: newAlert.sendTime === 'now' ? 'Active' : 'Scheduled',
      sentBy: 'System Admin'
    };
    setAlerts([alert, ...alerts]);
    setIsModalOpen(false);
    setNewAlert({
      title: '',
      category: 'General',
      severity: 'Medium',
      targetAudience: 'All',
      message: '',
      channels: ['In-App'],
      sendTime: 'now'
    });
  };

  const toggleChannel = (channel: 'In-App' | 'Email' | 'SMS') => {
    if (newAlert.channels.includes(channel)) {
      setNewAlert({ ...newAlert, channels: newAlert.channels.filter(c => c !== channel) });
    } else {
      setNewAlert({ ...newAlert, channels: [...newAlert.channels, channel] });
    }
  };

  const filteredAlerts = alerts.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Alert Dispatch Center</h2>
          <p className="text-slate-500 text-sm mt-1">Broadcast security and emergency notifications across campus.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="h-11 shadow-sm px-6 bg-[#f97316] hover:bg-[#ea580c] text-white"
        >
          <Plus size={18} className="mr-2" />
          Dispatch New Broadcast
        </Button>
      </div>

      <div className="bg-white p-2 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-2 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded flex-1">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search active transmissions..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1e3a5f] bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors uppercase tracking-wider">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1e3a5f] bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors uppercase tracking-wider">
            <Calendar size={14} /> Range
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="group hover:shadow-md transition-all h-auto overflow-hidden p-0" borderLeft={
            alert.severity === 'Critical' ? 'border-red-500' : 
            alert.severity === 'High' ? 'border-[#f97316]' : 'border-blue-400'
          }>
            <div className="flex flex-col md:flex-row p-6 items-start gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className={`${SEVERITY_COLORS[alert.severity]} shadow-none`}>{alert.severity}</Badge>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alert.category}</span>
                  <div className="h-4 w-px bg-slate-200"></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                    <Clock size={12} /> {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{alert.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">{alert.message}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[#1e3a5f]">
                      <Users size={14} />
                    </div>
                    <div className="leading-none">
                      <div className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">Audience</div>
                      <div className="text-xs font-bold text-slate-700">{alert.targetAudience}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[#1e3a5f]">
                      <Megaphone size={14} />
                    </div>
                    <div className="leading-none">
                      <div className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">Channels</div>
                      <div className="text-xs font-bold text-slate-700">{alert.channels.join(', ')}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${alert.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                      <CheckCircle size={14} />
                    </div>
                    <div className="leading-none">
                      <div className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">Status</div>
                      <div className={`text-xs font-bold ${alert.status === 'Active' ? 'text-green-600 animate-pulse' : 'text-slate-400'}`}>
                        {alert.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 w-full md:w-32">
                <button className="flex-1 px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                  <Edit2 size={14} /> View
                </button>
                <button className="flex-1 px-4 py-2 text-xs font-bold text-red-600 border border-red-100 bg-red-50/30 rounded hover:bg-red-50 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                  <Trash2 size={14} /> Close
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Alert Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#1e3a5f] p-5 text-white flex items-center justify-between border-b-4 border-[#f97316]">
              <div className="flex items-center gap-3">
                <Megaphone size={20} className="text-[#f97316]" />
                <h2 className="font-bold text-sm uppercase tracking-[0.2em]">New Security Broadcast</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="hover:scale-110 transition-transform p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Alert Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Urgent: Maintenance in Science Building"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    value={newAlert.title}
                    onChange={e => setNewAlert({...newAlert, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white font-medium"
                    value={newAlert.category}
                    onChange={e => setNewAlert({...newAlert, category: e.target.value as AlertCategory})}
                  >
                    {['Emergency', 'Academic', 'Health', 'Security', 'General'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Severity Level</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white font-medium"
                    value={newAlert.severity}
                    onChange={e => setNewAlert({...newAlert, severity: e.target.value as AlertSeverity})}
                  >
                    {['Low', 'Medium', 'High', 'Critical'].map(sev => (
                      <option key={sev} value={sev}>{sev}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Audience</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['All', 'Students Only', 'Staff Only', 'Department-specific'].map(target => (
                      <button
                        key={target}
                        type="button"
                        onClick={() => setNewAlert({...newAlert, targetAudience: target as TargetAudience})}
                        className={`py-2 px-3 text-xs font-bold border-2 rounded-lg transition-all ${
                          newAlert.targetAudience === target 
                            ? 'border-blue-900 bg-blue-50 text-blue-900 shadow-sm' 
                            : 'border-gray-100 text-gray-500 hover:border-blue-200'
                        }`}
                      >
                        {target}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Detailed Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Provide detailed instructions or information..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    value={newAlert.message}
                    onChange={e => setNewAlert({...newAlert, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Delivery Channels</label>
                  <div className="flex gap-6">
                    {['In-App', 'Email', 'SMS'].map(ch => (
                      <label key={ch} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => toggleChannel(ch as any)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                            newAlert.channels.includes(ch as any) ? 'bg-blue-900 border-blue-900' : 'border-gray-200 group-hover:border-blue-300'
                          }`}
                        >
                          {newAlert.channels.includes(ch as any) && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setNewAlert({...newAlert, sendTime: 'now'})}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 font-bold transition-all ${
                        newAlert.sendTime === 'now' ? 'border-orange-500 bg-orange-50 text-orange-900' : 'border-gray-100 text-gray-400'
                      }`}
                    >
                      <Send size={20} /> Publish Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewAlert({...newAlert, sendTime: 'schedule'})}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 font-bold transition-all ${
                        newAlert.sendTime === 'schedule' ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-gray-100 text-gray-400'
                      }`}
                    >
                      <Calendar size={20} /> Schedule Later
                    </button>
                  </div>
                  {newAlert.sendTime === 'schedule' && (
                    <div className="flex gap-4 animate-in slide-in-from-top-2">
                      <input type="date" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl" />
                      <input type="time" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1 py-4 text-lg font-bold shadow-lg"
                >
                  Create & Dispatch Alert
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="py-4 px-8 text-lg font-bold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
