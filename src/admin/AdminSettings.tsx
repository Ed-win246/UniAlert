import React from 'react';
import { 
  Building, 
  Bell, 
  Tag, 
  User, 
  Smartphone, 
  Mail, 
  Shield, 
  Globe,
  Plus
} from 'lucide-react';
import { Card, Button, Badge } from '../components/Common';

export const AdminSettings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-top-4 duration-500 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3a5f]">System Preferences</h2>
        <p className="text-slate-500 text-sm mt-1">Configure global notification protocols and broadcast parameters.</p>
      </div>

      <div className="space-y-6">

        <Card title="Distribution Protocols">
          <div className="space-y-4">
            {[
              { id: 'inapp', label: 'Push Infrastructure', desc: 'Native push notifications and live feeds', icon: Bell, status: true },
              { id: 'email', label: 'Enterprise SMTP', desc: 'Secure institutional email relay', icon: Mail, status: true },
              { id: 'sms', label: 'SMS Gateway Core', desc: 'Global text message delivery (Emergency Only)', icon: Smartphone, status: false },
            ].map(channel => (
              <div key={channel.id} className="flex items-center justify-between p-4 rounded border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-white rounded border border-slate-100 shadow-sm text-[#1e3a5f]">
                      <channel.icon size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm">{channel.label}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{channel.desc}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <span className={`text-[10px] font-bold uppercase ${channel.status ? 'text-green-600' : 'text-slate-400'}`}>
                      {channel.status ? 'Operational' : 'Deactivated'}
                   </span>
                   <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${channel.status ? 'bg-[#1e3a5f]' : 'bg-slate-200'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${channel.status ? 'translate-x-5' : ''}`}></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Crisis Control List">
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 rounded border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded bg-[#f97316] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ring-4 ring-[#f97316]/5">SJ</div>
                   <div>
                      <p className="font-bold text-slate-800 text-sm">Nabaale Jamie</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Main System Controller</p>
                   </div>
                </div>
                <Badge className="bg-slate-50 text-slate-600">Level 0: Root</Badge>
             </div>
             <div className="flex items-center justify-between p-4 rounded border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded bg-[#1e3a5f] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ring-4 ring-[#1e3a5f]/5">AM</div>
                   <div>
                      <p className="font-bold text-slate-800 text-sm">Paasi Reagan</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital Ops Manager</p>
                   </div>
                </div>
                <Badge className="bg-slate-50 text-slate-600">Level 1: Admin</Badge>
             </div>
          </div>
          <Button variant="outline" className="w-full mt-6 text-xs font-bold uppercase tracking-widest h-12 border-2">
             <Shield size={18} className="mr-2" /> Security Audit Sequence
          </Button>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-6">
           <Button variant="outline" className="px-10 h-11 text-xs font-bold uppercase tracking-widest border-2">Discard Sync</Button>
           <Button className="px-10 h-11 text-xs font-bold uppercase tracking-widest shadow-md">Deploy Changes</Button>
        </div>
      </div>
    </div>
  );
};
