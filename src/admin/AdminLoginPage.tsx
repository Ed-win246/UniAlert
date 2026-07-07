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
  const [formData, setFormData] = useState<LoginFormData>({email:'',password:'',role:'Admin'});
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



  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const name = {
        Admin: 'Atuhaire Edwin',
      };
      onLogin(name['Admin']);
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
  return errors;
}

  return (
    <div className="min-h-screen bg-orange-400 flex items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
      </div> 

      <div className="w-[40vw] h-[50vh] min-h-[200px] bg-red-900 rounded-xl shadow-2xl overflow-auto flex flex-col md:flex-row relative z-10 border-blue-200 border-blue-500/20 px-10 py-10">

        {/* Right Side: Form */}
        <div className="w-[40vw] md:w-[40vw] p-4 md:p-2 bg-blue- flex justify-center items-center">
          <div className="max-w-sm mx-auto">
            <h3 className="text-2xl font-bold  mb-2 text-center text-blue-800">Log In To Your Account!</h3>
            <p className="text-gray-500 mb-2">Enter Credentials To Access Your Portal!.</p>

            <form onSubmit={handleLogin} className="space-y-6">
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
                className="w-full py-4text-lg font-bold shadow-lg shadow-blue-900/20 mt-4 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin "></div>
                ) : (
                  <>Access Admin Portal</>
                )}
              </Button>
            </form>

            {/* <div className="mt-2 pt-2 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                Need help? <a href="#" className="text-blue-600 font-bold hover:underline">Contact System Administrator</a>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
