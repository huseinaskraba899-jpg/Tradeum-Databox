import React from 'react';
import { Product, Language, DICTIONARY } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  lang: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ products, lang }) => {
  const t = DICTIONARY[lang];
  const totalProducts = 12450;
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

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.dashboard}</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-1">{t.welcome}</p>
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
          {/* Explicit height and width handling to prevent re-charts calculation errors */}
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
    </div>
  );
};