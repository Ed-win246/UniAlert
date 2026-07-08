import React, { useState } from 'react';
import { ShieldAlert, BookOpen, UserCheck, Eye, EyeOff, User } from 'lucide-react';
import { Role } from '../types';
import { Button } from './Common';
import {LoginFormData, LoginFormErrors} from '../types';

interface LoginPageProps {
  onLogin: (role: Role, name: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData]=useState<LoginFormData>({email:'',password:'',role:'Student'});
  const [errors, setErrors]=useState<LoginFormErrors>({general:''});

  const handleChange=(field: keyof LoginFormData, value:string)=>{
    setFormData(prev=>({...prev, [field]:value}));

    if (field !== 'role' && errors[field]) {
      setErrors(prev=>({...prev, [field]: undefined}));
    }

    if (errors.general) {
      setErrors(prev=>({...prev, general: ''}));
    }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    handleChange('role', role);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password || validationErrors.role) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const names: Record<Role,string>={
        Staff: 'Hellen',
        Student: 'Jamirah',
        Guest: 'Guest User'
      };
      onLogin(formData.role, names[formData.role]);
      setLoading(false);
    }, 800);
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
  }else if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])/.test(data.password)){
    errors.password='Must have uppercase, lowercase, number and special character.';
  }
  if (!data.role) {
    errors.role='Please select a role';
  }
  return errors;
}

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-[80vw] h-[50vh] min-h-[480px] bg-white rounded-xl shadow-2xl overflow-auto flex flex-col md:flex-row relative z-10 border-gray-200 border-white/20">
        {/* Left Side: Branding */}
        <div className="w-full md:w-[45%] bg-[#12003d] p-12 text-white flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-400 p-2 rounded-lg">
                <ShieldAlert size={22} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">UniAlert</h1>
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-2 mt-2 italic">
              Empowering <br />
              <span className="text-orange-500">Safety & Communication Put First.</span>
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
              The unified emergency and informational broadcast system for Kyambogo University.
            </p>
          </div>
          
          <div className="mt-2 flex items-center gap-2 text-sm text-blue-300">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a3354] bg-blue-700 flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
            </div>
            <span>Trusted by 12,000+ Students & Staff At Kyambogo</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-4 md:p-8 bg-white">
          <div className="max-w-sm mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 "><span className="underline">Welcome Back!</span></h3>
            <p className="text-gray-500 mb-2">Select Your Role and Enter Credentials To Access Your Portal!.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-3 mb-2">
                {([ 'Staff', 'Student'] as Role[]).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className={`py-1 px-1 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1 group ${
                      selectedRole === role 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md transform -translate-y-1' 
                        : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-500'
                    }`}
                  >
                    {/* {role === 'Admin' && <UserCheck size={10} />} */}
                    {role === 'Staff' && <BookOpen size={10} />}
                    {role === 'Student' && <User size={10} />}
                    <span className="text-xs font-bold uppercase tracking-wider">{role}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">University Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="2300****@std.kyu.ac.ug"
                    className="w-full px-2 py-2 rounded-xl border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Enter your password!"
                      className="w-full px-2 py-2 rounded-xl border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
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

            <div className="mt-2 pt-2 border-t border-gray-100 text-center">
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
