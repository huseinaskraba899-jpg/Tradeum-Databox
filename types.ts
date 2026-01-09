export type Language = 'de' | 'en' | 'ch';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  sku: string;
  rawTitle: string;
  rawDescription: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  
  // Shop Status
  isOnline: boolean;
  
  // AI Enhanced Fields
  aiTitle?: string;
  aiDescription?: string;
  aiCategory?: string;
  aiStatus: 'pending' | 'generating' | 'completed' | 'failed';
  
  // Approval Workflow
  status: 'draft' | 'approved' | 'rejected';
  margin: number;
  marginSafe: boolean;
}

export interface CsvMapping {
  sku: string;
  title: string;
  description: string;
  price: string;
  stock: string;
}

export interface AppConfig {
  // FTP
  ftpHost: string;
  ftpUser: string;
  
  // Shopify
  shopifyUrl: string;
  shopifyAccessToken: string;
  
  // AI
  googleApiKey: string;

  // Rules
  syncInterval: '5min' | '30min' | '60min' | 'daily' | 'manual';
  minMarginPercent: number;
  roundingRule: 'none' | '.99' | '.95';
  
  // Mapping
  csvMapping: CsvMapping;
}

export type ViewState = 'dashboard' | 'approval' | 'configuration' | 'logs';

export const DICTIONARY = {
  en: {
    dashboard: 'Dashboard',
    approval: 'Products & Approval',
    config: 'Configuration',
    logs: 'Import Logs',
    welcome: 'Welcome back',
    systemOp: 'System Operational',
    totalProducts: 'Total Products',
    pending: 'Pending Approval',
    lowMargin: 'Low Margin',
    lastSync: 'Last Sync',
    approve: 'Approve & Sync',
    reject: 'Reject',
    generate: 'Generate with AI',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    ftpSettings: 'Wholesale FTP Connection',
    shopifySettings: 'Shopify Connection',
    aiSettings: 'AI Intelligence Settings',
    csvMapping: 'CSV Column Mapping',
    theme: 'Theme',
    language: 'Language',
    reimport: 'Re-Import Source',
    autoSync: 'Auto-Sync Active',
    login: 'Login',
    logout: 'Logout',
    email: 'Email Address',
    password: 'Password',
    signIn: 'Sign In',
    apiKeyPlaceholder: 'Enter your Gemini API Key',
    nextUpdate: 'Next Update',
    searchPlaceholder: 'Search by SKU or Name...',
    statusOnline: 'Online',
    statusOffline: 'Draft / Offline',
    filterAll: 'All Products',
    filterOnline: 'Live in Shop',
    filterDraft: 'Approval Queue',
    sync5min: 'Every 5 Minutes',
    sync30min: 'Every 30 Minutes',
    sync60min: 'Every Hour',
    syncDaily: 'Every 24 Hours',
    syncManual: 'Manual Only',
    manageConn: 'Manage connection, sync rules and mapping.',
    ftpHost: 'FTP Host',
    username: 'Username',
    syncSchedule: 'Sync Schedule',
    aiKeyDesc: 'Required for auto-generating descriptions and categories.',
    getKey: 'Get an API Key',
    storeUrl: 'Shopify Store URL (myshopify.com)',
    accessToken: 'Admin Access Token',
    testConn: 'Test Shopify Connection',
    csvFound: 'Found headers in last CSV scan. Map them to Tradeum fields below.',
    selectCol: '-- Select CSV Column --',
    marginRules: 'Margin & Pricing Rules',
    minMargin: 'Minimum Margin Protection (%)',
    minMarginDesc: 'Products below this margin will require manual approval.',
    priceRounding: 'Price Rounding',
    roundExact: 'Exact',
    round99: '.99 Ending',
    round95: '.95 Ending',
    importVol: 'Import Volume (7 Days)',
    errorDist: 'Error Distribution',
    missingImg: 'Missing Images',
    lowMarginBlock: 'Low Margin Block',
    invalidSku: 'Invalid SKU',
    tipError: 'Tip: Most missing image errors are caused by timeout on the wholesaler FTP server.',
    productsFound: 'products found',
    rawTitle: 'Raw Title',
    buy: 'Buy',
    sell: 'Sell',
    aiContentGen: 'AI Content Generation',
    aiGenDesc: 'Generate optimized titles, descriptions and categories using Gemini AI.',
    generating: 'Generating...',
    optTitle: 'Optimized Title',
    propCat: 'Proposed Category',
    descPreview: 'Description Preview',
    update: 'Update',
    // New Translations
    securityTitle: 'Security & Trust',
    securityDesc: 'This platform is protected by enterprise-grade security protocols.',
    secSsl: '256-bit SSL Encrypted',
    secIso: 'ISO 27001 Certified',
    secGdpr: 'GDPR Compliant',
    boxShop: 'Shop Information',
    boxSupport: 'Support Service',
    boxAi: 'AI Support Agent',
    revenue: 'Total Revenue',
    loggedIn: 'Logged in as',
    startChat: 'Start Chat with Tradeus',
    chatTitle: 'Tradeus AI Support',
    chatPlaceholder: 'How can I help you today?',
    address: 'Address',
    phone: 'Phone',
    emailContact: 'Email'
  },
  de: {
    dashboard: 'Übersicht',
    approval: 'Produkte & Freigabe',
    config: 'Einstellungen',
    logs: 'Protokolle',
    welcome: 'Willkommen zurück',
    systemOp: 'System Bereit',
    totalProducts: 'Alle Produkte',
    pending: 'Ausstehend',
    lowMargin: 'Niedrige Marge',
    lastSync: 'Letzter Abgleich',
    approve: 'Freigeben & Sync',
    reject: 'Ablehnen',
    generate: 'Mit KI optimieren',
    edit: 'Bearbeiten',
    save: 'Speichern',
    cancel: 'Abbrechen',
    ftpSettings: 'Großhändler FTP Verbindung',
    shopifySettings: 'Shopify Verbindung',
    aiSettings: 'KI Intelligenz Einstellungen',
    csvMapping: 'CSV Spaltenzuordnung',
    theme: 'Design',
    language: 'Sprache',
    reimport: 'Neu importieren',
    autoSync: 'Auto-Sync Aktiv',
    login: 'Anmelden',
    logout: 'Abmelden',
    email: 'E-Mail Adresse',
    password: 'Passwort',
    signIn: 'Einloggen',
    apiKeyPlaceholder: 'Gemini API Key eingeben',
    nextUpdate: 'Nächstes Update',
    searchPlaceholder: 'Suche nach SKU oder Name...',
    statusOnline: 'Online',
    statusOffline: 'Entwurf / Offline',
    filterAll: 'Alle Produkte',
    filterOnline: 'Im Shop Online',
    filterDraft: 'Freigabe Liste',
    sync5min: 'Alle 5 Minuten',
    sync30min: 'Alle 30 Minuten',
    sync60min: 'Jede Stunde',
    syncDaily: 'Alle 24 Stunden',
    syncManual: 'Nur Manuell',
    manageConn: 'Verwalten Sie Verbindungen, Sync-Regeln und Zuordnungen.',
    ftpHost: 'FTP Host',
    username: 'Benutzername',
    syncSchedule: 'Zeitplan',
    aiKeyDesc: 'Erforderlich für die automatische Generierung von Beschreibungen und Kategorien.',
    getKey: 'API Key anfordern',
    storeUrl: 'Shopify Shop URL (myshopify.com)',
    accessToken: 'Admin Access Token',
    testConn: 'Verbindung testen',
    csvFound: 'Kopfzeilen im letzten CSV-Scan gefunden. Ordnen Sie diese unten zu.',
    selectCol: '-- Spalte wählen --',
    marginRules: 'Margen & Preisregeln',
    minMargin: 'Minimale Marge (%)',
    minMarginDesc: 'Produkte unter dieser Marge erfordern manuelle Freigabe.',
    priceRounding: 'Preisrundung',
    roundExact: 'Exakt',
    round99: '.99 Endung',
    round95: '.95 Endung',
    importVol: 'Import Volumen (7 Tage)',
    errorDist: 'Fehlerverteilung',
    missingImg: 'Fehlende Bilder',
    lowMarginBlock: 'Margenschutz Block',
    invalidSku: 'Ungültige SKU',
    tipError: 'Tipp: Fehlende Bilder werden oft durch Timeouts beim Großhändler verursacht.',
    productsFound: 'Produkte gefunden',
    rawTitle: 'Originaltitel',
    buy: 'Einkauf',
    sell: 'Verkauf',
    aiContentGen: 'KI Inhaltserstellung',
    aiGenDesc: 'Generieren Sie optimierte Titel, Beschreibungen und Kategorien mit Gemini AI.',
    generating: 'Generiere...',
    optTitle: 'Optimierter Titel',
    propCat: 'Vorgeschlagene Kategorie',
    descPreview: 'Beschreibung Vorschau',
    update: 'Aktualisieren',
    // New Translations
    securityTitle: 'Sicherheit & Vertrauen',
    securityDesc: 'Diese Plattform ist durch Sicherheitsprotokolle der Enterprise-Klasse geschützt.',
    secSsl: '256-Bit SSL Verschlüsselt',
    secIso: 'ISO 27001 Zertifiziert',
    secGdpr: 'DSGVO Konform',
    boxShop: 'Shop Informationen',
    boxSupport: 'Kundenservice',
    boxAi: 'KI Support Agent',
    revenue: 'Gesamtumsatz',
    loggedIn: 'Angemeldet als',
    startChat: 'Chat mit Tradeus starten',
    chatTitle: 'Tradeus KI Support',
    chatPlaceholder: 'Wie kann ich Ihnen helfen?',
    address: 'Adresse',
    phone: 'Telefon',
    emailContact: 'E-Mail'
  },
  ch: {
    dashboard: 'Übersicht',
    approval: 'Produkt & Freigab',
    config: 'Iistellige',
    logs: 'Protokoll',
    welcome: 'Sali zäme',
    systemOp: 'System lauft',
    totalProducts: 'Total Produkt',
    pending: 'Warteschlange',
    lowMargin: 'Tüüfi Marge',
    lastSync: 'Letschte Abgliich',
    approve: 'Freigäh & Sync',
    reject: 'Ablehne',
    generate: 'Mit KI optimiere',
    edit: 'Aapasse',
    save: 'Spichere',
    cancel: 'Abbräche',
    ftpSettings: 'Grosshändler FTP Verbindig',
    shopifySettings: 'Shopify Verbindig',
    aiSettings: 'KI Intelligenz Iistellige',
    csvMapping: 'CSV Spaltezuewisig',
    theme: 'Design',
    language: 'Sprooch',
    reimport: 'Neu importiere',
    autoSync: 'Auto-Sync Aktiv',
    login: 'Aamälde',
    logout: 'Abmälde',
    email: 'E-Mail Adrässe',
    password: 'Passwort',
    signIn: 'Iilogge',
    apiKeyPlaceholder: 'Gemini API Key iigäh',
    nextUpdate: 'Nächsts Update',
    searchPlaceholder: 'Suueche nach SKU oder Name...',
    statusOnline: 'Online',
    statusOffline: 'Entwurf / Offline',
    filterAll: 'Alli Produkt',
    filterOnline: 'Im Shop Online',
    filterDraft: 'Freigab Lischtä',
    sync5min: 'Alli 5 Minutä',
    sync30min: 'Alli 30 Minutä',
    sync60min: 'Jedi Stund',
    syncDaily: 'Alli 24 Stund',
    syncManual: 'Nur Manuell',
    manageConn: 'Verbindige, Sync-Regle und Zueornige verwalte.',
    ftpHost: 'FTP Host',
    username: 'Benutzernama',
    syncSchedule: 'Ziitplan',
    aiKeyDesc: 'Bruucht für d\'automatisch Generierig vo Beschriibige.',
    getKey: 'API Key hole',
    storeUrl: 'Shopify Shop URL',
    accessToken: 'Admin Access Token',
    testConn: 'Verbindig teschtä',
    csvFound: 'Mir händ Kopfziile im CSV gfundä. Bitte ordne.',
    selectCol: '-- Spalte wähle --',
    marginRules: 'Marge & Priisregle',
    minMargin: 'Minimali Marge (%)',
    minMarginDesc: 'Produkt unter dere Marge müend manuell prüeft werde.',
    priceRounding: 'Priisrundig',
    roundExact: 'Exakt',
    round99: '.99 Ändig',
    round95: '.95 Ändig',
    importVol: 'Import Volume (7 Täg)',
    errorDist: 'Fählerverteilig',
    missingImg: 'Fählendi Bilder',
    lowMarginBlock: 'Margeschutz Block',
    invalidSku: 'Ungültigi SKU',
    tipError: 'Tipp: Fählendi Bilder ligget oft amene Timeout bim Grosshändler.',
    productsFound: 'Produkt gfunde',
    rawTitle: 'Originaltitel',
    buy: 'Iichauf',
    sell: 'Verchauf',
    aiContentGen: 'KI Inhaltsgenerierig',
    aiGenDesc: 'Generier optimierti Titel, Beschriibige und Kategorie mit Gemini AI.',
    generating: 'Am Generiere...',
    optTitle: 'Optimierte Titel',
    propCat: 'Vorschlag Kategori',
    descPreview: 'Beschriibig Vorschau',
    update: 'Aktualisiere',
    // New Translations
    securityTitle: 'Sicherheit & Vertraue',
    securityDesc: 'Die Plattform isch mit Enterprise-Security Standards gschützt.',
    secSsl: '256-Bit SSL Verschlüsslet',
    secIso: 'ISO 27001 Zertifiziert',
    secGdpr: 'DSGVO Konform',
    boxShop: 'Shop Infos',
    boxSupport: 'Kundedienscht',
    boxAi: 'KI Support Agent',
    revenue: 'Gsamtuusatz',
    loggedIn: 'Aagmäldet als',
    startChat: 'Chat mit Tradeus starte',
    chatTitle: 'Tradeus KI Support',
    chatPlaceholder: 'Wie chani dir hälfe?',
    address: 'Adrässe',
    phone: 'Telefon',
    emailContact: 'E-Mail'
  }
};