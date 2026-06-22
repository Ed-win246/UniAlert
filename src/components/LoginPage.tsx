import React, { useState } from 'react';
import { ShieldAlert, BookOpen, UserCheck, Eye, EyeOff, User } from 'lucide-react';
import { Role } from '../types';
import { Button } from './Common';

interface LoginPageProps {
  onLogin: (role: Role, name: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const names = {
        Admin: 'Atuhaire Edwin',
        Staff: 'Mirembe Jovia',
        Student: 'Jamirah',
        Guest: 'John Michael'
      };
      onLogin(selectedRole, names[selectedRole]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#1e3a5f] flex items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/20">
        {/* Left Side: Branding */}
        <div className="w-full md:w-[45%] bg-[#1a3354] p-12 text-white flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-500 p-2 rounded-lg">
                <ShieldAlert size={32} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">UniAlert</h1>
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-6 mt-12 italic">
              Empowering <br />
              <span className="text-orange-500">Safety & Communication Put First</span>
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
              The unified emergency and informational broadcast system for Kyambogo University.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-blue-300">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a3354] bg-blue-700 flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
            </div>
            <span>Trusted by 12,000+ Students & Staff</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-8 md:p-16 bg-white">
          <div className="max-w-sm mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h3>
            <p className="text-gray-500 mb-8">Select your role and enter credentials to access your portal.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-3 mb-2">
                {(['Admin', 'Staff', 'Student'] as Role[]).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-3 px-2 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 group ${
                      selectedRole === role 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md transform -translate-y-1' 
                        : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-500'
                    }`}
                  >
                    {role === 'Admin' && <UserCheck size={20} />}
                    {role === 'Staff' && <BookOpen size={20} />}
                    {role === 'Student' && <User size={20} />}
                    <span className="text-xs font-bold uppercase tracking-wider">{role}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">University Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="2300****@std.kyu.ac.ug"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="Enter your password!"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-600">Remember Me</span>
                  </label>
                  <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-900/20 mt-4 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Access {selectedRole} Portal</>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                Need help? <a href="#" className="text-blue-600 font-bold hover:underline">Contact System Administrator</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
