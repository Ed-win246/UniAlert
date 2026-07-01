import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  User, 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  Settings as SettingsIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SidebarItem } from './Common';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: Role;
  onLogout: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
  userName: string;
}
// dont use the fucntion component for the layout use type or interface instead
export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  userRole, 
  onLogout, 
  activePath, 
  onNavigate,
  userName
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminMenu = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'alerts', label: 'Alert Management', icon: AlertTriangle },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const userMenu = [
    { id: 'feed', label: 'Home Feed', icon: LayoutDashboard },
    { id: 'notifications', label: 'Preferences', icon: Bell },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const menuItems = userRole === 'Admin' ? adminMenu : userMenu;

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">

      <aside 
        className={`hidden md:flex flex-col bg-[#1e3a5f] text-white transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6 border-b border-[#2d4d71] flex items-center gap-3">
          {!collapsed ? (
            <>
              <div className="w-8 h-8 bg-[#f97316] rounded flex items-center justify-center font-bold text-lg">U</div>
              <div className="leading-tight">
                <div className="font-bold text-sm tracking-wide">KYAMBOGO<span className="text-orange-400"> ALERT</span></div>
                <div className="text-[10px] opacity-60 uppercase">Management System</div>
              </div>
            </>
          ) : (
            <div className="w-8 h-8 bg-[#f97316] rounded flex items-center justify-center font-bold text-lg mx-auto">U</div>
          )}
        </div>

        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activePath === item.id}
              onClick={() => onNavigate(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 bg-[#172e4d] border-t border-white/5">
          <div className="flex items-center gap-3 p-2">
            <div className={`shrink-0 h-10 w-10 rounded-full bg-blue-400 border-2 border-white/20 flex items-center justify-center font-bold text-sm text-[#1e3a5f] shadow-inner`}>
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold truncate">{userName}</div>
                <div className="text-[10px] opacity-50 uppercase tracking-tighter">{userRole}</div>
              </div>
            )}
            {!collapsed && (
               <button 
                onClick={onLogout}
                className="text-white/40 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full mt-4 flex items-center justify-center p-2 hover:bg-white/5 rounded text-white/40 hover:text-white transition-all"
          >
            {collapsed ? <ChevronRight size={18} /> : <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ChevronLeft size={18} /> <span>Collapse</span></div>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-slate-500"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-[#1e3a5f] hidden sm:block">
              {menuItems.find(i => i.id === activePath)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Notifications">
                <Bell size={22} />
                <span className="absolute top-1 right-1 bg-[#f97316] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  3
                </span>
              </button>
            </div>
            
            <button className="bg-[#f97316] text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-[#ea580c] transition-all shadow-sm">
              <ShieldAlert size={16} />
              <span className="hidden sm:inline">Active Alert</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-[#1e3a5f] p-6 shadow-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 font-bold text-xl text-white">
                <ShieldAlert className="text-orange-500" size={24} />
                <span>Uni<span className="text-orange-500">Alert</span></span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activePath === item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                />
              ))}
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-900/30 rounded-lg transition-colors mt-4"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
