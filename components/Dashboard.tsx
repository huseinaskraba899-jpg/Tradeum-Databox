import React, { useState, useRef, useEffect } from 'react';
import { Product, Language, DICTIONARY, User } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, CheckCircle, Clock, ShoppingBag, Phone, Mail, MapPin, Bot, MessageSquare, Send, User as UserIcon, X } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  lang: Language;
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  user: User | null;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ products, lang, showNotification, user }) => {
  const t = DICTIONARY[lang];
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat when opened
  useEffect(() => {
      if (isChatOpen && messages.length === 0) {
          setMessages([
              { id: '1', role: 'assistant', text: 'Hello! I am Tradeus. How can I assist you with your data import today?' }
          ]);
      }
  }, [isChatOpen]);

  // Scroll to bottom
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const totalProducts = products.length;
  const pending = products.filter(p => p.status === 'draft').length;
  const lowMargin = products.filter(p => !p.marginSafe).length;

  const chartData = [
    { name: 'Mon', imported: 400, errors: 24 },
    { name: 'Tue', imported: 300, errors: 13 },
    { name: 'Wed', imported: 200, errors: 58 },
    { name: 'Thu', imported: 278, errors: 39 },
    { name: 'Fri', imported: 189, errors: 48 },
    { name: 'Sat', imported: 239, errors: 38 },
    { name: 'Sun', imported: 349, errors: 43 },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if(!chatMessage.trim()) return;
      
      const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: chatMessage };
      setMessages(prev => [...prev, userMsg]);
      setChatMessage('');
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              text: "I understand. I'm analyzing your store's data pattern. Please allow me a moment to optimize the import settings for better results."
          }]);
      }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8 relative">
      
      {/* 3 Main Boxes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Box 1: Shop Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-tradeum-100 dark:bg-tradeum-900/30 rounded-lg text-tradeum-600 dark:text-tradeum-400">
                      <ShoppingBag size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t.boxShop}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tradeum Demo Store GmbH</p>
                  </div>
              </div>
              <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t.revenue}</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">€1,245,300</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t.loggedIn}</span>
                      <div className="flex items-center gap-2 overflow-hidden">
                          <UserIcon size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]" title={user?.email}>{user?.email || 'User'}</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Box 2: Support Service */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Phone size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t.boxSupport}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Available Mon-Fri, 9-18h</p>
                  </div>
              </div>
              <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer">
                      <Phone size={16} /> <span>+41 44 123 45 67</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer">
                      <Mail size={16} /> <span>support@tradeum.io</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <MapPin size={16} /> <span>Bahnhofstrasse 100, Zürich</span>
                  </div>
              </div>
          </div>

          {/* Box 3: AI Support (BRAND COLOR) */}
          <div className="bg-gradient-to-br from-tradeum-500 to-tradeum-700 rounded-xl p-6 shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Bot size={100} />
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Bot size={24} className="text-white" />
                  </div>
                  <div>
                      <h3 className="font-bold text-white text-lg">{t.boxAi}</h3>
                      <p className="text-sm text-tradeum-100">Instant Help & Config Assistant</p>
                  </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full py-3 bg-white text-tradeum-700 font-bold rounded-lg hover:bg-tradeum-50 transition-colors flex items-center justify-center gap-2 relative z-10 shadow-sm"
              >
                  <MessageSquare size={18} /> {t.startChat}
              </button>
          </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.dashboard} Overview</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-md border dark:border-gray-700 shadow-sm">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           {t.systemOp}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.totalProducts}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{totalProducts.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
              <Activity size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
            <ArrowUpRight size={16} className="mr-1" />
            <span>+12%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.pending}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{pending}</h3>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Action Required</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.lowMargin}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{lowMargin}</h3>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
            <ArrowDownRight size={16} className="mr-1" />
            <span>+4</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.lastSync}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1h 24m</h3>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Next: 14:00</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm lg:col-span-2 flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.importVol}</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorImported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8cb35a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8cb35a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)', backgroundColor: '#1f2937', color: '#fff'}}
                  itemStyle={{color: '#fff'}}
                />
                <Area type="monotone" dataKey="imported" stroke="#8cb35a" strokeWidth={2} fillOpacity={1} fill="url(#colorImported)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.errorDist}</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">{t.missingImg}</span>
                <span className="font-medium text-gray-900 dark:text-white">42%</span>
             </div>
             <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '42%'}}></div>
             </div>

             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">{t.lowMarginBlock}</span>
                <span className="font-medium text-gray-900 dark:text-white">35%</span>
             </div>
             <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '35%'}}></div>
             </div>

             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">{t.invalidSku}</span>
                <span className="font-medium text-gray-900 dark:text-white">12%</span>
             </div>
             <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '12%'}}></div>
             </div>
             
             <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
               <p>{t.tipError}</p>
             </div>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {isChatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsChatOpen(false)}></div>
              <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col h-[500px] border border-gray-200 dark:border-gray-700 animate-slide-in">
                  <div className="bg-gradient-to-r from-tradeum-500 to-tradeum-700 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3 text-white">
                          <Bot />
                          <span className="font-bold">{t.chatTitle}</span>
                      </div>
                      <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                          <X size={20} />
                      </button>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-4 overflow-y-auto space-y-4">
                      {messages.map(msg => (
                          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                              {msg.role === 'assistant' && (
                                  <div className="w-8 h-8 rounded-full bg-tradeum-100 dark:bg-tradeum-900/30 flex items-center justify-center text-tradeum-600 dark:text-tradeum-400 flex-shrink-0">
                                      <Bot size={18} />
                                  </div>
                              )}
                              <div className={`p-3 rounded-2xl shadow-sm border text-sm max-w-[80%] ${
                                  msg.role === 'user' 
                                  ? 'bg-tradeum-500 text-white rounded-tr-none border-tradeum-600' 
                                  : 'bg-white dark:bg-gray-800 rounded-tl-none border-gray-100 dark:border-gray-700 dark:text-gray-200'
                              }`}>
                                  {msg.text}
                              </div>
                          </div>
                      ))}
                      {isTyping && (
                         <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-tradeum-100 dark:bg-tradeum-900/30 flex items-center justify-center text-tradeum-600 dark:text-tradeum-400 flex-shrink-0">
                                  <Bot size={18} />
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 flex gap-1 items-center">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                              </div>
                         </div>
                      )}
                      <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex gap-2 items-center">
                          <input 
                            type="text" 
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder={t.chatPlaceholder}
                            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tradeum-500 dark:text-white border-2 border-transparent focus:border-tradeum-500 transition-all"
                          />
                          <button 
                            type="submit" 
                            disabled={!chatMessage.trim() || isTyping}
                            className="px-4 py-3 bg-tradeum-500 text-white rounded-xl hover:bg-tradeum-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95"
                          >
                              <Send size={20} />
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
};