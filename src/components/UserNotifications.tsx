import React, { useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  Mail, 
  Moon, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  HeartPulse, 
  AlertTriangle,
  Zap,
  Info
} from 'lucide-react';
import { Card, Button, Badge } from './Common';
import { NotificationPreference } from '../types';

export const UserNotifications: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { category: 'Emergency', channels: { inApp: true, email: true, sms: true } },
    { category: 'Security', channels: { inApp: true, email: true, sms: true } },
    { category: 'Health', channels: { inApp: true, email: true, sms: false } },
    { category: 'Academic', channels: { inApp: true, email: true, sms: false } },
    { category: 'General', channels: { inApp: true, email: false, sms: false } },
  ]);

  const toggleChannel = (category: string, channel: 'inApp' | 'email' | 'sms') => {
    setPreferences(preferences.map(p => {
      if (p.category === category) {
        return {
          ...p,
          channels: {
            ...p.channels,
            [channel]: !p.channels[channel]
          }
        };
      }
      return p;
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Emergency': return <ShieldAlert size={18} />;
      case 'Security': return <AlertTriangle size={18} />;
      case 'Health': return <HeartPulse size={18} />;
      case 'Academic': return <BookOpen size={18} />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Communication Protocol</h2>
        <p className="text-slate-500 text-sm mt-1">Configure individual broadcast reception parameters and priority bypass.</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-[#1e3a5f] border-none text-white overflow-hidden relative" borderLeft="border-[#f97316]">
           <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10 p-2">
              <div className="flex-1">
                 <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                   <Zap size={18} className="text-[#f97316]" /> Emergency Priority Bypass
                 </h3>
                 <p className="text-blue-100/70 text-xs leading-relaxed">Critical institutional safety broadcasts will circumvent all silent modes and DND protocols on registered devices.</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded border border-white/10 shrink-0">
                 <span className="font-bold uppercase tracking-widest text-[10px]">Strict Safety Sync</span>
                 <div className="w-10 h-5 bg-[#f97316] rounded-full p-1 flex items-center justify-end">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                 </div>
              </div>
           </div>
        </Card>

        <Card title="Broadcast Channel Matrix">
           <div className="space-y-6 mt-4">
              <div className="grid grid-cols-4 gap-4 pb-2 border-b border-slate-100">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alert Profile</div>
                 <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Push</div>
                 <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</div>
                 <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">SMS</div>
              </div>

              {preferences.map((pref) => (
                 <div key={pref.category} className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border border-slate-100 ${
                          pref.category === 'Emergency' ? 'bg-red-50 text-red-500' : 
                          pref.category === 'Academic' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'
                       }`}>
                          {getCategoryIcon(pref.category)}
                       </div>
                       <span className="font-bold text-slate-700 text-xs">{pref.category}</span>
                    </div>
                    <div className="flex justify-center">
                       <button
                        onClick={() => toggleChannel(pref.category, 'inApp')}
                        className={`w-9 h-5 rounded-full p-1 transition-colors ${pref.channels.inApp ? 'bg-[#1e3a5f]' : 'bg-slate-200'}`}
                       >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${pref.channels.inApp ? 'translate-x-4' : ''}`}></div>
                       </button>
                    </div>
                    <div className="flex justify-center">
                       <button 
                        onClick={() => toggleChannel(pref.category, 'email')}
                        className={`w-9 h-5 rounded-full p-1 transition-colors ${pref.channels.email ? 'bg-[#1e3a5f]' : 'bg-slate-200'}`}
                       >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${pref.channels.email ? 'translate-x-4' : ''}`}></div>
                       </button>
                    </div>
                    <div className="flex justify-center">
                       <button 
                        onClick={() => toggleChannel(pref.category, 'sms')}
                        className={`w-9 h-5 rounded-full p-1 transition-colors ${pref.channels.sms ? 'bg-[#1e3a5f]' : 'bg-slate-200'}`}
                        disabled={['General', 'Academic'].includes(pref.category)}
                       >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${pref.channels.sms ? 'translate-x-4' : ''}`}></div>
                       </button>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 p-4 bg-slate-50 rounded border border-slate-100 flex items-start gap-4">
              <Info className="text-[#1e3a5f] shrink-0" size={18} />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight leading-relaxed italic">
                 SMS alerts for "General" and "Academic" categories are restricted by institutional policy to prioritize network bandwidth for critical security transmissions.
              </p>
           </div>
        </Card>

        <Card title="Restricted Broadcast Hours">
           <div className="flex items-center justify-between p-4 rounded bg-slate-50 border border-slate-100 mb-6 group">
              <div className="flex items-center gap-4">
                 <div className="p-2.5 bg-white rounded border border-slate-200 text-purple-600 group-hover:text-purple-700 transition-colors">
                    <Moon size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 text-sm">Quiet Mode Protocols</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Suppress non-critical broadcasts during selected intervals.</p>
                 </div>
              </div>
              <div className="w-10 h-5 bg-slate-200 rounded-full p-1 cursor-not-allowed opacity-50">
                 <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suppress from</label>
                 <select className="w-full p-3 rounded border border-slate-200 bg-white text-xs font-bold text-slate-400 opacity-60 cursor-not-allowed outline-none appearance-none">
                    <option>22:00 (10:00 PM)</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resume at</label>
                 <select className="w-full p-3 rounded border border-slate-200 bg-white text-xs font-bold text-slate-400 opacity-60 cursor-not-allowed outline-none appearance-none">
                    <option>06:00 (06:00 AM)</option>
                 </select>
              </div>
           </div>
        </Card>

        <div className="flex items-center justify-end pt-4">
           <Button className="h-12 px-12 text-xs font-bold uppercase tracking-widest shadow-md">
              <CheckCircle2 size={18} className="mr-2" /> Commit Channel State
           </Button>
        </div>
      </div>
    </div>
  );
};
