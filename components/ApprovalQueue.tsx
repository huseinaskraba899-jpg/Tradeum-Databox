import React, { useState } from 'react';
import { Product, Language, DICTIONARY } from '../types';
import { generateProductContent } from '../services/geminiService';
import { Wand2, AlertTriangle, Check, X, RefreshCw, Eye, Edit2, RotateCcw, Save, Search, Globe, FileText, Filter } from 'lucide-react';

interface ApprovalQueueProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  lang: Language;
  apiKey: string;
}

export const ApprovalQueue: React.FC<ApprovalQueueProps> = ({ products, onUpdateProduct, onApprove, onReject, lang, apiKey }) => {
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const isGenerating = !!generatingId;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'online' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  
  const t = DICTIONARY[lang];

  const handleGenerateAI = async (product: Product) => {
    if (!apiKey) {
      alert(t.apiKeyPlaceholder);
      return;
    }

    setGeneratingId(product.id);
    const updatedProduct = { ...product, aiStatus: 'generating' as const };
    onUpdateProduct(updatedProduct);

    try {
      const aiContent = await generateProductContent(product, lang, apiKey);
      onUpdateProduct({
        ...product,
        aiTitle: aiContent.title,
        aiDescription: aiContent.description,
        aiCategory: aiContent.category,
        aiStatus: 'completed'
      });
    } catch (error) {
      console.error(error);
      alert("Failed to generate content. Please check your API Key in Configuration.");
      onUpdateProduct({ ...product, aiStatus: 'failed' });
    } finally {
      setGeneratingId(null);
    }
  };

  const startEditing = (product: Product) => {
      setEditingId(product.id);
      setEditForm({
          rawTitle: product.rawTitle,
          buyPrice: product.buyPrice,
          sellPrice: product.sellPrice,
          stock: product.stock
      });
  };

  const saveEdit = (product: Product) => {
      const updated = {
          ...product,
          ...editForm,
          // Recalculate margin logic loosely
          margin: editForm.sellPrice && editForm.buyPrice ? Math.round(((editForm.sellPrice - editForm.buyPrice) / editForm.sellPrice) * 100) : product.margin
      };
      // @ts-ignore
      onUpdateProduct(updated);
      setEditingId(null);
  };

  const handleReImport = (product: Product) => {
      // Logic to re-fetch would go here, for now we reset
      if(confirm(t.reimport + "?")) {
         onUpdateProduct({...product, aiStatus: 'pending', status: 'draft'});
      }
  };

  // Filter Logic
  const filteredProducts = products.filter(p => {
    // 1. Search Filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = p.sku.toLowerCase().includes(query) || 
                          p.rawTitle.toLowerCase().includes(query) || 
                          (p.aiTitle && p.aiTitle.toLowerCase().includes(query));
    
    if (!matchesSearch) return false;

    // 2. View Mode Filter
    if (viewMode === 'online') return p.isOnline;
    if (viewMode === 'draft') return !p.isOnline; // Draft implies not online yet
    
    return true; // 'all' returns everything
  });

  return (
    <div className="space-y-6 h-[calc(100vh-80px)] flex flex-col">
      
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.approval}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{filteredProducts.length} {t.productsFound}</p>
            </div>
            
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-tradeum-500 transition-all dark:text-white"
                />
            </div>
          </div>

          <div className="flex gap-2 border-t border-gray-100 dark:border-gray-800 pt-3 overflow-x-auto">
             <button 
                onClick={() => setViewMode('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'all' ? 'bg-tradeum-100 text-tradeum-800 dark:bg-tradeum-900/30 dark:text-tradeum-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
             >
                 <Filter size={16} /> {t.filterAll}
             </button>
             <button 
                onClick={() => setViewMode('online')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
             >
                 <Globe size={16} /> {t.filterOnline}
             </button>
             <button 
                onClick={() => setViewMode('draft')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${viewMode === 'draft' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
             >
                 <FileText size={16} /> {t.filterDraft}
             </button>
          </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {filteredProducts.map(product => (
          <div key={product.id} className={`bg-white dark:bg-gray-900 rounded-xl border shadow-sm overflow-hidden flex flex-col lg:flex-row transition-all ${product.isOnline ? 'border-green-200 dark:border-green-900/30' : 'border-gray-200 dark:border-gray-800'}`}>
            
            {/* Status Indicator Stripe */}
            <div className={`w-full lg:w-1 flex-shrink-0 ${product.isOnline ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>

            {/* Left: Original Data */}
            <div className="w-full lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-start mb-4 gap-2 flex-wrap">
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">SKU: {product.sku}</span>
                    {product.isOnline ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800">{t.statusOnline}</span>
                    ) : (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">{t.statusOffline}</span>
                    )}
                 </div>

                 {!product.marginSafe && (
                     <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                         <AlertTriangle size={12} /> {product.margin}%
                     </span>
                 )}
                 {product.marginSafe && (
                     <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                         Marge {product.margin}%
                     </span>
                 )}
              </div>
              
              {editingId === product.id ? (
                  <div className="space-y-3">
                      <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">{t.rawTitle}</label>
                          <input 
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            value={editForm.rawTitle}
                            onChange={e => setEditForm({...editForm, rawTitle: e.target.value})}
                          />
                      </div>
                      <div className="flex gap-2">
                         <div className="w-1/2">
                            <label className="text-xs text-gray-500 dark:text-gray-400">{t.buy} (€)</label>
                            <input 
                                type="number"
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                                value={editForm.buyPrice}
                                onChange={e => setEditForm({...editForm, buyPrice: parseFloat(e.target.value)})}
                            />
                         </div>
                         <div className="w-1/2">
                            <label className="text-xs text-gray-500 dark:text-gray-400">{t.sell} (€)</label>
                            <input 
                                type="number"
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                                value={editForm.sellPrice}
                                onChange={e => setEditForm({...editForm, sellPrice: parseFloat(e.target.value)})}
                            />
                         </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                          <button onClick={() => saveEdit(product)} className="flex-1 bg-green-600 text-white py-1 rounded text-xs flex justify-center items-center gap-1"><Save size={12} /> {t.save}</button>
                          <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-1 rounded text-xs">{t.cancel}</button>
                      </div>
                  </div>
              ) : (
                  <>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 text-sm">{t.rawTitle} <button onClick={() => startEditing(product)} className="text-tradeum-500 ml-2 hover:underline text-xs"><Edit2 size={12} className="inline"/></button></h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.rawTitle}</p>

                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 text-sm">{t.marginRules}</h4>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500 dark:text-gray-400">{t.buy}:</span>
                        <span className="font-mono text-gray-700 dark:text-gray-300">€{product.buyPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t.sell}:</span>
                        <span className="font-bold text-gray-900 dark:text-white">€{product.sellPrice.toFixed(2)}</span>
                    </div>
                  </>
              )}
            </div>

            {/* Right: AI Enrichment */}
            <div className="w-full lg:w-2/3 p-6 flex flex-col relative">
              
              {product.aiStatus === 'pending' || product.aiStatus === 'failed' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                        <Wand2 size={24} />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">{t.aiContentGen}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-sm">{t.aiGenDesc}</p>
                    <button 
                        onClick={() => handleGenerateAI(product)}
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {generatingId === product.id ? t.generating : t.generate}
                        <Wand2 size={16} />
                    </button>
                </div>
              ) : (
                <div className="flex-1 space-y-4">
                     {product.aiStatus === 'generating' && (
                         <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-10 flex items-center justify-center">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                         </div>
                     )}
                    
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm flex items-center gap-2">
                                <Wand2 size={14} /> {t.optTitle}
                            </h4>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium text-lg">{product.aiTitle}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm mb-1">{t.propCat}</h4>
                        <span className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-md text-sm font-medium border border-indigo-100 dark:border-indigo-800">
                            {product.aiCategory}
                        </span>
                    </div>

                    <div>
                         <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm mb-1">{t.descPreview}</h4>
                         <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 max-h-32 overflow-y-auto" dangerouslySetInnerHTML={{__html: product.aiDescription || ''}}></div>
                    </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-end gap-3">
                   <button 
                    onClick={() => handleReImport(product)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-tradeum-600 dark:hover:text-tradeum-400 text-sm font-medium transition-colors mr-auto"
                    title={t.reimport}
                  >
                      <RotateCcw size={16} /> <span className="hidden sm:inline">{t.reimport}</span>
                  </button>

                  <button 
                    onClick={() => onReject(product.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors"
                  >
                      <X size={16} /> {t.reject}
                  </button>
                  <button 
                    onClick={() => handleGenerateAI(product)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                  >
                      <RefreshCw size={16} /> 
                  </button>
                  <button 
                    onClick={() => onApprove(product.id)}
                    disabled={product.aiStatus === 'pending' || product.aiStatus === 'failed'}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Check size={16} /> {product.isOnline ? t.update : t.approve}
                  </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-dashed">
                <p className="text-gray-500 dark:text-gray-400">No products found matching filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};