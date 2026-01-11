import React, { useState } from 'react';
import { TrendingUp, Lock, Mail, ArrowRight, Info, ShieldCheck, Database, UserPlus, LogIn } from 'lucide-react';
import { Language, DICTIONARY } from '../types';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => boolean;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onRegister, lang, onLangChange }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const t = DICTIONARY[lang];

  // Set default credentials only in login mode for demo
  React.useEffect(() => {
    if (isLoginMode && email === '') {
        setEmail('admin@tradeum.com');
        setPassword('admin123');
    } else if (!isLoginMode) {
        setEmail('');
        setPassword('');
    }
    setErrorMsg('');
    setSuccessMsg('');
  }, [isLoginMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (isLoginMode) {
          try {
              onLogin(email, password);
          } catch (e) {
              setErrorMsg(t.authFailed);
          }
      } else {
          const success = onRegister(email, password);
          if (success) {
              setSuccessMsg(t.regSuccess);
              setTimeout(() => {
                  setIsLoginMode(true);
                  setSuccessMsg('');
                  setEmail(email); // Keep email for login
                  setPassword(password); // Keep password for login convenience
              }, 1500);
          } else {
              setErrorMsg(t.userExists);
          }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 relative transition-colors duration-300">
      
      {/* Language Switcher Top Right */}
      <div className="absolute top-6 right-6 flex gap-1 bg-white dark:bg-gray-900 p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        {(['de', 'en', 'ch'] as Language[]).map(l => (
            <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`text-xs font-bold px-3 py-1.5 rounded transition-all ${
                    lang === l 
                    ? 'bg-tradeum-500 text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
                {l.toUpperCase()}
            </button>
        ))}
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-8 animate-fade-in">
        
        <div className="text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-tradeum-100 dark:border-tradeum-800 shadow-lg shadow-tradeum-500/10 mb-6">
             <TrendingUp className="text-tradeum-500 w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight uppercase">Tradeum</h1>
          <p className="text-tradeum-600 dark:text-tradeum-400 font-bold tracking-widest text-xs uppercase mb-2">Databox</p>
          <p className="text-gray-500 dark:text-gray-400">Professional Wholesale Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.email}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tradeum-500 transition-all"
                placeholder={isLoginMode ? "admin@tradeum.com" : "name@company.com"}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.password}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tradeum-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {errorMsg && (
              <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
                  {errorMsg}
              </div>
          )}
          {successMsg && (
              <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-900/30">
                  {successMsg}
              </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-tradeum-500 hover:bg-tradeum-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tradeum-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isLoginMode ? <LogIn size={18} /> : <UserPlus size={18} />}
                {isLoginMode ? t.signIn : t.createAccount}
              </>
            )}
          </button>
        </form>

        <div className="text-center">
            <button 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-sm text-tradeum-600 dark:text-tradeum-400 hover:underline font-medium"
            >
                {isLoginMode ? t.noAccount : t.haveAccount}
            </button>
        </div>

        {/* Demo Credentials Info Box - Only show in login mode */}
        {isLoginMode && (
            <div className="p-4 bg-tradeum-50 dark:bg-tradeum-900/10 rounded-lg border border-tradeum-100 dark:border-tradeum-800/30">
                <div className="flex items-center gap-2 text-tradeum-700 dark:text-tradeum-400 mb-2">
                    <Info size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Demo Credentials</span>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">User:</span>
                    <span className="font-mono text-gray-800 dark:text-gray-200">admin@tradeum.com</span>
                    <span className="font-medium">Pass:</span>
                    <span className="font-mono text-gray-800 dark:text-gray-200">admin123</span>
                </div>
            </div>
        )}

        {/* Security Info Area */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> {t.securityTitle}
           </h3>
           <div className="flex justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                    <Lock size={12} /> <span className="text-[10px] font-bold">SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                    <ShieldCheck size={12} /> <span className="text-[10px] font-bold">ISO 27001</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
                    <Database size={12} /> <span className="text-[10px] font-bold">DSGVO</span>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};