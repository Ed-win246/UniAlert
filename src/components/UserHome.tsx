import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCheck, 
  Clock, 
  Info, 
  AlertTriangle,
  HeartPulse,
  BookOpen,
  ShieldAlert,
  X
} from 'lucide-react';
import { Card, Badge, Button } from './Common';
import { MOCK_ALERTS, SEVERITY_COLORS, CATEGORY_COLORS } from '../constants';
import { Alert, AlertCategory } from '../types';

export const UserHome: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [selectedCategory, setSelectedCategory] = useState<AlertCategory | 'All'>('All');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = alerts.filter(a => 
    (selectedCategory === 'All' || a.category === selectedCategory) && a.status === 'Active'
  );

  const getCategoryIcon = (category: AlertCategory) => {
    switch (category) {
      case 'Emergency': return <ShieldAlert size={24} className="text-red-500" />;
      case 'Health': return <HeartPulse size={24} className="text-green-500" />;
      case 'Academic': return <BookOpen size={24} className="text-blue-500" />;
      case 'Security': return <AlertTriangle size={24} className="text-purple-500" />;
      default: return <Info size={24} className="text-gray-500" />;
    }
  };

  const markAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would update state/DB
    console.log('Marked as read:', id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Active Broadcasts</h2>
          <p className="text-slate-500 text-sm mt-1">Institutional security status and emergency notifications.</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-white rounded border border-slate-200 shadow-sm overflow-x-auto max-w-full">
           {['All', 'Emergency', 'Academic', 'Health', 'Security', 'General'].map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat as any)}
               className={`px-4 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest whitespace-nowrap ${
                 selectedCategory === cat 
                   ? 'bg-[#1e3a5f] text-white' 
                   : 'text-slate-400 hover:bg-slate-50'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded border-l-4 border-l-[#f97316]">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#f97316] flex items-center justify-center text-white shrink-0 shadow-sm">
               <Bell size={20} className="animate-pulse" />
            </div>
            <div>
               <p className="text-sm font-bold text-slate-800">Campus Status Notification</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">You have {filteredAlerts.length} active updates for your profile.</p>
            </div>
         </div>
         <button className="text-[10px] font-bold text-[#1e3a5f] hover:underline uppercase tracking-[0.2em] hidden sm:block">Mark All Read</button>
      </div>

      <div className="grid gap-6">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className="cursor-pointer hover:shadow-md transition-all overflow-hidden p-0"
              onClick={() => setSelectedAlert(alert)}
              borderLeft={
                alert.severity === 'Critical' ? 'border-red-500' : 
                alert.severity === 'High' ? 'border-[#f97316]' : 'border-blue-400'
              }
            >
              <div className="p-6 flex items-start gap-6">
                <div className={`w-12 h-12 rounded bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 transition-colors group-hover:bg-white`}>
                  {getCategoryIcon(alert.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className={`${SEVERITY_COLORS[alert.severity]} shadow-none`}>
                        {alert.severity}
                      </Badge>
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em]">{alert.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                       <Clock size={12} /> {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{alert.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 max-w-2xl">{alert.message}</p>
                </div>
                <div className="flex items-center shrink-0 self-center">
                   <button 
                     onClick={(e) => markAsRead(alert.id, e)}
                     className="p-2 text-slate-300 hover:text-green-600 transition-colors"
                     title="Acknowledge Receipt"
                   >
                     <CheckCheck size={20} />
                   </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded border border-slate-200">
             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-4">
                <ShieldAlert size={24} />
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Active Transmissions </p>
          </div>
        )}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={() => setSelectedAlert(null)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-8 border-b-4 border-[#f97316]">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center border border-slate-100">
                    {getCategoryIcon(selectedAlert.category)}
                  </div>
                  <button 
                    onClick={() => setSelectedAlert(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                   <Badge className={`${SEVERITY_COLORS[selectedAlert.severity]} px-3 font-bold`}>
                      {selectedAlert.severity} PRIORITY
                   </Badge>
                   <h2 className="text-3xl font-bold text-[#1e3a5f] leading-tight">{selectedAlert.title}</h2>
                   <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                     <span className="flex items-center gap-1.5"><Clock size={12}/>{new Date(selectedAlert.createdAt).toLocaleString()}</span>
                     <span className="flex items-center gap-1.5"><Info size={12}/>ID: {selectedAlert.id}</span>
                   </div>
                </div>
             </div>

             <div className="p-8 space-y-8">
                <div className="bg-slate-50 p-6 rounded border border-slate-100">
                   <p className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-wrap">
                      {selectedAlert.message}
                   </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                   <Button 
                    className="flex-1 h-12 text-xs font-bold uppercase tracking-widest shadow-md"
                    onClick={() => setSelectedAlert(null)}
                   >
                      <CheckCheck size={18} className="mr-2" /> Acknowledge Notification
                   </Button>
                   <Button 
                    variant="outline" 
                    className="flex-1 h-12 text-xs font-bold uppercase tracking-widest border-2"
                   >
                      Institutional Archive
                   </Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
