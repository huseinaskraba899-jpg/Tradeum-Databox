import React, { useState } from 'react';
import { AppConfig, Language, DICTIONARY } from '../types';
import { Save, Server, ShieldCheck, Clock, Calculator, Sliders, ShoppingBag, Database, ArrowRight, Bot } from 'lucide-react';

interface ConfigurationProps {
  config: AppConfig;
  onSave: (config: AppConfig) => void;
  lang: Language;
}

export const Configuration: React.FC<ConfigurationProps> = ({ config, onSave, lang }) => {
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);
  const t = DICTIONARY[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localConfig);
  };

  const MOCK_CSV_HEADERS = [
    'Artikelnummer', 'Bezeichnung', 'Langtext', 'EK_Preis', 'VK_Preis', 'Bestand', 'Gewicht', 'Hersteller', 'EAN'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.config}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t.manageConn}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Connection Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
            <Server className="text-tradeum-500" size={20} />
            <h2 className="font-semibold text-gray-900 dark:text-white">{t.ftpSettings}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.ftpHost}</label>
              <input 
                type="text" 
                value={localConfig.ftpHost}
                onChange={(e) => setLocalConfig({...localConfig, ftpHost: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-tradeum-500 outline-none transition-all"
                placeholder="ftp.wholesaler.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.username}</label>
              <input 
                type="text" 
                value={localConfig.ftpUser}
                onChange={(e) => setLocalConfig({...localConfig, ftpUser: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-tradeum-500 outline-none transition-all"
                placeholder="user123"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.password}</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-tradeum-500 outline-none transition-all"
                placeholder="••••••••••••"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.syncSchedule}</label>
              <select 
                value={localConfig.syncInterval}
                onChange={(e) => setLocalConfig({...localConfig, syncInterval: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-tradeum-500 outline-none"
              >
                <option value="manual">{t.syncManual}</option>
                <option value="5min">{t.sync5min}</option>
                <option value="30min">{t.sync30min}</option>
                <option value="60min">{t.sync60min}</option>
                <option value="daily">{t.syncDaily}</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
            <Bot className="text-purple-600 dark:text-purple-400" size={20} />
            <h2 className="font-semibold text-gray-900 dark:text-white">{t.aiSettings}</h2>
          </div>
          <div className="p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Google Gemini API Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={localConfig.googleApiKey}
                  onChange={(e) => setLocalConfig({...localConfig, googleApiKey: e.target.value})}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all font-mono text-sm"
                  placeholder={t.apiKeyPlaceholder}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ShieldCheck className="text-gray-400" size={16} />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {t.aiKeyDesc} 
                <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-purple-600 hover:underline ml-1">{t.getKey}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Shopify Connection */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
            <ShoppingBag className="text-green-600 dark:text-green-400" size={20} />
            <h2 className="font-semibold text-gray-900 dark:text-white">{t.shopifySettings}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.storeUrl}</label>
              <input 
                type="text" 
                value={localConfig.shopifyUrl}
                onChange={(e) => setLocalConfig({...localConfig, shopifyUrl: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="my-store.myshopify.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.accessToken}</label>
              <input 
                type="password" 
                value={localConfig.shopifyAccessToken}
                onChange={(e) => setLocalConfig({...localConfig, shopifyAccessToken: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="shpat_xxxxxxxxxxxxxxxx"
              />
            </div>
            <div className="md:col-span-2">
                <button type="button" className="text-sm text-green-600 dark:text-green-400 font-medium hover:underline flex items-center gap-1">
                    <ShieldCheck size={16} /> {t.testConn}
                </button>
            </div>
          </div>
        </div>

        {/* CSV Mapping */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
            <Database className="text-orange-600 dark:text-orange-400" size={20} />
            <h2 className="font-semibold text-gray-900 dark:text-white">{t.csvMapping}</h2>
          </div>
          <div className="p-6 space-y-4">
             <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/30">
                {t.csvFound}
             </div>
             
             {[
               { key: 'sku', label: 'SKU (Unique ID)' },
               { key: 'title', label: 'Raw Product Title' },
               { key: 'description', label: 'Raw Description' },
               { key: 'price', label: 'Buying Price' },
               { key: 'stock', label: 'Inventory Level' }
             ].map((field) => (
                <div key={field.key} className="flex flex-col md:flex-row md:items-center gap-4 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="w-40 font-medium text-gray-700 dark:text-gray-300">{field.label}</div>
                    <ArrowRight size={16} className="text-gray-400 hidden md:block" />
                    <select 
                        value={(localConfig.csvMapping as any)[field.key]}
                        onChange={(e) => setLocalConfig({
                            ...localConfig, 
                            csvMapping: { ...localConfig.csvMapping, [field.key]: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                        <option value="">{t.selectCol}</option>
                        {MOCK_CSV_HEADERS.map(h => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
             ))}
          </div>
        </div>

        {/* Business Logic Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
            <Calculator className="text-tradeum-500" size={20} />
            <h2 className="font-semibold text-gray-900 dark:text-white">{t.marginRules}</h2>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.minMargin}</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="number" 
                            value={localConfig.minMarginPercent}
                            onChange={(e) => setLocalConfig({...localConfig, minMarginPercent: Number(e.target.value)})}
                            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{t.minMarginDesc}</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.priceRounding}</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <input 
                                type="radio" 
                                name="rounding" 
                                checked={localConfig.roundingRule === 'none'}
                                onChange={() => setLocalConfig({...localConfig, roundingRule: 'none'})}
                                className="text-tradeum-500 focus:ring-tradeum-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.roundExact}</span>
                        </label>
                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-tradeum-200 dark:border-tradeum-700 bg-tradeum-50 dark:bg-tradeum-900/20">
                            <input 
                                type="radio" 
                                name="rounding" 
                                checked={localConfig.roundingRule === '.99'}
                                onChange={() => setLocalConfig({...localConfig, roundingRule: '.99'})}
                                className="text-tradeum-500 focus:ring-tradeum-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.round99}</span>
                        </label>
                         <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <input 
                                type="radio" 
                                name="rounding" 
                                checked={localConfig.roundingRule === '.95'}
                                onChange={() => setLocalConfig({...localConfig, roundingRule: '.95'})}
                                className="text-tradeum-500 focus:ring-tradeum-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.round95}</span>
                        </label>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
            <button type="submit" className="flex items-center gap-2 bg-tradeum-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-tradeum-700 transition-colors shadow-lg shadow-tradeum-900/20">
                <Save size={18} /> {t.save}
            </button>
        </div>

      </form>
    </div>
  );
};