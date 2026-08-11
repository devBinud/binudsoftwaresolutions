import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff
} from 'react-icons/hi';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      toast.success('Welcome back to Admin Portal!');
      navigate('/admin');
    } catch {
      toast.error('Invalid admin credentials. Please verify and try again.');
    }
  };

  const handleForgotPassword = () => {
    toast('Please contact root administration to reset admin access credentials.', {
      icon: '🔒',
      duration: 4500,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#005eb8] to-[#002244] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Background Ambient Glow Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-300/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Centered Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[450px] bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.28)] border border-white/20 p-8 sm:p-10 relative z-10"
      >
        {/* Centered Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <img
              src="/logo.png"
              alt="Binud Software Solutions"
              className="h-12 w-auto object-contain drop-shadow-sm"
            />
          </Link>
        </div>

        {/* Form Header */}
        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Log in to your account
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-normal">
            Please enter your details
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Email
            </label>
            <div className="relative">
              <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full bg-slate-50/70 hover:bg-white focus:bg-white text-slate-800 text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#005eb8] focus:ring-4 focus:ring-[#005eb8]/10 transition-all outline-none"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
              <input
                {...register('password', { required: 'Password is required' })}
                type={showPass ? 'text' : 'password'}
                className="w-full bg-slate-50/70 hover:bg-white focus:bg-white text-slate-800 text-sm pl-11 pr-11 py-3 rounded-xl border border-slate-200 focus:border-[#005eb8] focus:ring-4 focus:ring-[#005eb8]/10 transition-all outline-none"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                title={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#005eb8] border-slate-300 focus:ring-[#005eb8]/20 cursor-pointer accent-[#005eb8]"
              />
              <span className="text-xs sm:text-sm text-slate-600 font-medium">
                Remember for 30 days
              </span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs sm:text-sm font-semibold text-[#005eb8] hover:text-[#00488e] hover:underline cursor-pointer"
            >
              Forgot password
            </button>
          </div>

          {/* Log in Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#005eb8] hover:bg-[#00488e] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[#005eb8]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60 mt-3"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Log in</span>
            )}
          </button>
        </form>

      </motion.div>
    </div>
  );
};

export default AdminLogin;
