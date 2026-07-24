import React, { useState } from 'react';
import { ShieldAlert, UserCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/Common';
import {LoginFormData, LoginFormErrors} from '../types';

interface AdminLoginPageProps {
  onLogin: ( name: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({email:'',password:''});
  const [errors, setErrors] = useState<LoginFormErrors>({general:''});

  const handleChange=(field: keyof LoginFormData, value:string)=>{
    setFormData(prev=>({...prev, [field]:value}));

    if (errors[field]) {
      setErrors(prev=>({...prev, [field]: undefined}));
    }

    if (errors.general) {
      setErrors(prev=>({...prev, general: ''}));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          general: data.message || data.error || 'Invalid email or password',
        }));
        return;
      }

      const loggedInName = data.user?.first_name 
        ? `${data.user.first_name} ${data.user.last_name || ''}`.trim()
        : formData.email;

      onLogin(loggedInName);
    } catch (err) {
      console.error('Login error:', err);
      setErrors((prev) => ({
        ...prev,
        general: 'Unable to connect to server. Please ensure the backend is running on port 3000.',
      }));
    } finally {
      setLoading(false);
    }
  };

function validateForm(data:LoginFormData):LoginFormErrors{
  const errors:LoginFormErrors= {general:''}
  if (!data.email.trim()){
    errors.email='Email is required';
  }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
    errors.email='Enter a valid Email address';
  }
  if(!data.password.trim()){
    errors.password='Password is required';
  }
  return errors;
}

  return (
    <div className="min-h-screen bg-[#fff4d6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-auto flex flex-col relative z-10 px-10 py-10 backdrop-blur-md ">
        <div className="w-full flex justify-center items-center ">
          <div className="w-full">
            
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5">
                <ShieldAlert size={14} className="text-red-500" />
                <span className="text-red-600 text-xs font-semibold uppercase tracking-wide">
                  Admin access only
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-center text-[#1a2744]">
              Log In To Your Account!
            </h3>
            <p className="text-slate-400 text-sm text-center mb-6">
              Enter Credentials To Access Your Portal!.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 text-center font-medium">
                  {errors.general}
                </div>
              )}
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    University Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="2300****@std.kyu.ac.ug"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm
                      placeholder:text-slate-400 outline-none transition-all
                      ${errors.email
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-slate-300 bg-slate-50 focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10'
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Enter your password!"
                      className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm
                        placeholder:text-slate-400 outline-none transition-all
                        ${errors.password
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-slate-300 bg-slate-50 focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-[#1a2744] focus:ring-[#1a2744]"
                    />
                    <span className="text-sm text-slate-600">Remember Me</span>
                  </label>
                  <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot password?
                  </a>
                </div>

              </div>

              <Button
                type="submit"
                className="w-full py-3 text-sm font-bold shadow-lg mt-4 flex items-center justify-center gap-2 bg-[#1a2744] hover:bg-[#263560] text-white rounded-xl transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <UserCheck size={18} />
                    Access Admin Portal
                  </>
                )}
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}