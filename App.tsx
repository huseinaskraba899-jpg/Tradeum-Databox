import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ApprovalQueue } from './components/ApprovalQueue';
import { Configuration } from './components/Configuration';
import { Login } from './components/Login';
import { ViewState, Product, AppConfig, Language, Theme, DICTIONARY } from './types';
import { RefreshCw, Clock } from 'lucide-react';

// Mock Initial Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'WH-8842-BL',
    rawTitle: 'Mens T-Shirt Cotton Bulk Pack 10 Blue',
    rawDescription: '100% Cotton material. Made in Turkey. Wash cold.',
    buyPrice: 4.50, // Per unit cost effective
    sellPrice: 12.99,
    stock: 500,
    isOnline: true,
    aiTitle: 'Mens Cotton T-Shirt Bulk Pack (10pcs) - Blue',
    aiCategory: 'Clothing > Mens > Tops',
    aiStatus: 'completed',
    status: 'approved',
    margin: 65,
    marginSafe: true
  },
  {
    id: '2',
    sku: 'EL-GAM-MOUSE-RGB',
    rawTitle: 'Gaming Mouse 2400DPI RGB Led',
    rawDescription: 'Wired USB mouse. 5 buttons. Black color.',
    buyPrice: 18.00,
    sellPrice: 22.00,
    stock: 120,
    isOnline: false,
    aiStatus: 'pending',
    status: 'draft',
    margin: 18,
    marginSafe: false // Low margin (under 20% example)
  },
  {
    id: '3',
    sku: 'KT-MIX-STAND',
    rawTitle: 'Kitchen Stand Mixer 5L Bowl',
    rawDescription: 'Heavy duty mixer. 3 attachments included. Silver.',
    buyPrice: 85.00,
    sellPrice: 159.00,
    stock: 45,
    isOnline: false,
    aiStatus: 'pending',
    status: 'draft',
    margin: 46,
    marginSafe: true
  }
];

const INITIAL_CONFIG: AppConfig = {
  ftpHost: 'ftp.suppliers.com',
  ftpUser: 'wholesale_connect',
  syncInterval: 'daily',
  minMarginPercent: 25,
  roundingRule: '.99',
  shopifyUrl: '',
  shopifyAccessToken: '',
  googleApiKey: '',
  csvMapping: {
    sku: 'Artikelnummer',
    title: 'Bezeichnung',
    description: 'Langtext',
    price: 'EK_Preis',
    stock: 'Bestand'
  }
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  
  // System Theme Detection
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [lang, setLang] = useState<Language>('de');

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Recalculate margins when config changes
  useEffect(() => {
    setProducts(prev => prev.map(p => {
        const margin = Math.round(((p.sellPrice - p.buyPrice) / p.sellPrice) * 100);
        return {
            ...p,
            margin,
            marginSafe: margin >= config.minMarginPercent
        };
    }));
  }, [config.minMarginPercent]);

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleApprove = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved', isOnline: true } : p));
    alert(DICTIONARY[lang].approve + " OK");
  };

  const handleReject = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const pendingCount = products.filter(p => !p.isOnline).length;
  const t = DICTIONARY[lang];

  if (!isAuthenticated) {
    return (
      <div className={`${theme}`}>
         <Login 
            onLogin={() => setIsAuthenticated(true)} 
            lang={lang} 
            onLangChange={setLang}
         />
      </div>
    );
  }

  return (
    <div className={`${theme}`}>
        <div className="flex min-h-screen bg-[#F6F6F7] dark:bg-gray-950 transition-colors duration-300">
        <Sidebar 
            currentView={currentView} 
            onChangeView={setCurrentView}
            pendingCount={pendingCount}
            currentLang={lang}
            onLangChange={setLang}
            currentTheme={theme}
            onThemeChange={setTheme}
            onLogout={() => setIsAuthenticated(false)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-screen w-full flex flex-col">
            
            <div className="max-w-7xl mx-auto w-full flex-1">
            {currentView === 'dashboard' && <Dashboard products={products} lang={lang} />}
            
            {currentView === 'approval' && (
                <ApprovalQueue 
                    products={products}
                    onUpdateProduct={handleUpdateProduct}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    lang={lang}
                    apiKey={config.googleApiKey}
                />
            )}
            
            {currentView === 'configuration' && (
                <Configuration 
                    config={config}
                    onSave={(newConfig) => {
                        setConfig(newConfig);
                        alert("Configuration saved successfully.");
                    }}
                    lang={lang}
                />
            )}

            {currentView === 'logs' && (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <p className="text-gray-500 dark:text-gray-400">Log viewer not implemented in prototype.</p>
                </div>
            )}
            </div>
        </main>
        </div>
    </div>
  );
}