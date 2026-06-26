import React from 'react';
import { 
  User, 
  Smartphone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Lock, 
  CreditCard, 
  ShieldCheck,
  Edit2,
   ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Card, Button, Badge } from './Common';
import { MOCK_ALERTS } from '../constants';

export const UserProfile: React.FC<{ userName: string; role: string }> = ({ userName, role }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded bg-[#1e3a5f] flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white ring-1 ring-slate-200">
               {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-100 text-[#1e3a5f] hover:scale-110 transition-transform">
               <Edit2 size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1e3a5f]">{userName}</h2>
            <div className="flex items-center gap-3 mt-1">
               <Badge className="bg-slate-50 text-[#1e3a5f] border-slate-200 font-bold">{role}</Badge>
               <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">ID: NWU-2024-8842</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-10 px-6 text-[10px] font-bold uppercase tracking-widest border-2">Identity Hub</Button>
           <Button className="h-10 px-6 text-[10px] font-bold uppercase tracking-widest shadow-md">Update Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card title="Personnel Record">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Legal Name</p>
                <div className="bg-slate-50 p-3 rounded border border-slate-100 font-bold text-slate-700 text-sm flex items-center gap-2">
                  <User size={14} className="text-[#1e3a5f]" /> {userName}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Institutional Email</p>
                <div className="bg-slate-50 p-3 rounded border border-slate-100 font-bold text-slate-400 text-sm flex items-center gap-2">
                  <Mail size={14} className="text-[#1e3a5f]" /> e.rodriguez@university.edu
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Department</p>
                <div className="bg-slate-50 p-3 rounded border border-slate-100 font-bold text-slate-400 text-sm flex items-center gap-2">
                  <GraduationCap size={14} className="text-[#1e3a5f]" /> Business School
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile Contact</p>
                <div className="relative">
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 0125" 
                    className="w-full px-10 py-3 rounded border border-slate-200 focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 outline-none transition-all text-sm font-bold text-slate-700" 
                  />
                  <Smartphone size={14} className="text-[#1e3a5f] absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Crisis Compliance History" className="p-0 overflow-hidden">
             <div className="divide-y divide-slate-100">
                {MOCK_ALERTS.slice(0, 3).map((alert, i) => (
                   <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                         <div>
                            <p className="text-xs font-bold text-slate-700">{alert.title}</p>
                            <p className="text-[9px] font-bold text-slate-400 flex items-center gap-1 mt-0.5 uppercase tracking-widest">
                               <Clock size={10} /> Received {new Date(alert.createdAt).toLocaleDateString()}
                            </p>
                         </div>
                      </div>
                      <Badge className="bg-slate-50 text-slate-400 font-bold text-[9px] border-none uppercase tracking-widest">Acknowledged</Badge>
                   </div>
                ))}
             </div>
             <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                <button className="text-[9px] font-bold text-[#1e3a5f] hover:underline uppercase tracking-widest">View Transmission Logs</button>
             </div>
          </Card>
        </div>

        <div className="space-y-6">
           <Card title="Identity Security" borderLeft="border-[#f97316]">
              <div className="flex flex-col items-center text-center py-4">
                 <div className="w-16 h-16 rounded bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-[#f97316] mb-4">
                    <ShieldCheck size={32} />
                 </div>
                 <h4 className="text-sm font-bold text-slate-800">Verified Personnel ID</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status: Active & Secure</p>
                 <div className="mt-6 w-full space-y-2">
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-[#1e3a5f] transition-all">
                       <span className="flex items-center gap-2"><Lock size={14} /> Password Reset</span>
                       <ChevronRight size={14} className="text-slate-300" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-[#1e3a5f] transition-all">
                       <span className="flex items-center gap-2"><Lock size={14} /> MFA Protocols</span>
                       <Badge className="bg-green-50 text-green-700 text-[8px] py-0">SYNCED</Badge>
                    </button>
                 </div>
              </div>
           </Card>

           <Card title="Registered Workstation">
              <div className="space-y-4">
                 <div className="h-24 bg-slate-100 rounded border border-slate-200 mb-4 overflow-hidden grayscale contrast-125 opacity-70 group hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Campus Map Preview" />
                 </div>
                 <div className="space-y-1">
                    <p className="font-bold text-slate-800 text-xs">Primary Operations Base</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Business School Quadrant, Wing B</p>
                 </div>
              </div>
           </Card>

           <button className="w-full py-3 rounded bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-100 border border-red-100 transition-all">
              Request Identity Deactivation
           </button>
        </div>
      </div>
    </div>
  );
};
