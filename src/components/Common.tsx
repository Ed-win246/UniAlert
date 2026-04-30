import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isActive, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
      isActive 
        ? 'bg-[#2d4d71] text-white border-l-4 border-[#f97316]' 
        : 'text-white/70 hover:bg-[#2d4d71] hover:text-white'
    }`}
    title={collapsed ? label : undefined}
  >
    <Icon size={18} className="shrink-0" />
    {!collapsed && <span className="text-sm font-medium tracking-wide leading-tight">{label}</span>}
  </button>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; borderLeft?: string }> = ({ 
  children, 
  className = '', 
  title,
  borderLeft
}) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden ${borderLeft ? `border-l-4 ${borderLeft}` : ''} ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="font-bold text-slate-700">{title}</h3>
      </div>
    )}
    <div className={title ? "p-6" : ""}>{children}</div>
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-[#1e3a5f] text-white hover:bg-[#1a3354] shadow-sm',
    secondary: 'bg-[#f97316] text-white hover:bg-[#ea580c] shadow-sm transition-colors',
    outline: 'border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  };
  
  return (
    <button 
      className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
