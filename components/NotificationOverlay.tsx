import React, { useEffect } from 'react';
import { AlertTriangle, CheckCircle, X, Info } from 'lucide-react';

export interface NotificationType {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface NotificationOverlayProps {
  notification: NotificationType | null;
  onClose: () => void;
}

export const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const getStyles = () => {
    switch (notification.type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/40 dark:border-red-800 dark:text-red-200';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/40 dark:border-green-800 dark:text-green-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-200';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'error': return <AlertTriangle className="w-6 h-6" />;
      case 'success': return <CheckCircle className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      
      {/* Notification Card */}
      <div className={`pointer-events-auto relative min-w-[300px] max-w-md p-6 rounded-2xl shadow-2xl border flex items-center gap-4 animate-bounce-in transform scale-100 ${getStyles()}`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 font-medium">
          {notification.message}
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};