import React, { useState } from 'react';
import { ViewState, Language, Theme, DICTIONARY } from '../types';
import { LayoutDashboard, CheckSquare, Settings, FileText, Moon, Sun, Menu, X, LogOut, TrendingUp } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  pendingCount: number;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, onChangeView, pendingCount, currentLang, onLangChange, currentTheme, onThemeChange, onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = DICTIONARY[currentLang];

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'approval', label: t.approval, icon: CheckSquare, badge: pendingCount },
    { id: 'configuration', label: t.config, icon: Settings },
    { id: 'logs', label: t.logs, icon: FileText },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Logo Placeholder - Replace src with your local file path if needed
  // Using a generated placeholder that mimics the green graph logo described
  const Logo = () => (
      <div className="flex items-center gap-2">
         {/* If you have the image file, uncomment the img tag and remove the div below */}
         {/* <img src="/logo.png" alt="Tradeum" className="h-10 w-auto" /> */}
         
         {/* CSS Fallback matching the logo style provided */}
         <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border border-tradeum-200 dark:border-tradeum-800 shadow-sm">
                 <TrendingUp className="text-tradeum-500 w-6 h-6" />
            </div>
            <div>
                <span className="block font-bold text-gray-800 dark:text-white text-xl tracking-tight leading-none uppercase">Tradeum</span>
                <span className="block text-[10px] font-bold text-tradeum-500 uppercase tracking-[0.2em] leading-tight">Databox</span>
            </div>
         </div>
      </div>
  );

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-900">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto bg-white dark:bg-gray-900">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onChangeView(item.id as ViewState);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-4 text-left rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-tradeum-50 dark:bg-tradeum-900/20 text-tradeum-700 dark:text-tradeum-400 shadow-sm border border-tradeum-100 dark:border-tradeum-800/50' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={`${isActive ? 'text-tradeum-600 dark:text-tradeum-500' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge ? (
                <span className={`py-0.5 px-2.5 rounded-full text-xs font-bold ${isActive ? 'bg-tradeum-100 dark:bg-tradeum-900/40 text-tradeum-700 dark:text-tradeum-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4 bg-white dark:bg-gray-900">
        {/* Controls */}
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
            <button 
                onClick={() => onThemeChange(currentTheme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-md hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors shadow-sm"
                title="Toggle Theme"
            >
                {currentTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex gap-1">
                {(['de', 'en', 'ch'] as Language[]).map(lang => (
                    <button
                        key={lang}
                        onClick={() => onLangChange(lang)}
                        className={`text-xs font-bold px-2 py-1 rounded transition-colors ${currentLang === lang ? 'bg-white dark:bg-gray-700 text-tradeum-600 dark:text-tradeum-400 shadow-sm' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-tradeum-100 dark:bg-tradeum-900/30 flex items-center justify-center text-tradeum-600 dark:text-tradeum-400 font-bold text-xs">
                AD
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
            </div>
            </div>
            <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title={t.logout}
            >
                <LogOut size={18} />
            </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-50">
         <Logo />
         <button onClick={toggleSidebar} className="p-2 text-gray-600 dark:text-gray-300">
             {isOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex-col sticky top-0 transition-colors duration-300">
        <SidebarContent />
      </div>

      {/* Mobile Slide-over */}
      {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleSidebar}></div>
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 flex flex-col shadow-2xl animate-slide-in">
                 <SidebarContent />
              </div>
          </div>
      )}
    </>
  );
};