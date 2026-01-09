# Tradeum Databox

Professional Wholesale Data Import & AI Enrichment Platform for Shopify.

Tradeum Databox helps e-commerce merchants automate the import, enrichment, and synchronization of wholesaler product data into Shopify stores.

## 🚀 Features

*   **Dashboard**: Real-time overview of import volumes, error distribution, and sales metrics.
*   **AI Enrichment**: Seamlessly integrated with Google Gemini API to generate SEO-optimized product titles, HTML descriptions, and taxonomy categorization.
*   **Approval Workflow**: Review products before they go live. Filter by 'Draft' or 'Online' status.
*   **Configuration Center**: Manage FTP credentials, Shopify API tokens, and Margin/Pricing rules.
*   **Security & Trust**: Visual indicators for SSL, ISO 27001, and GDPR compliance to ensure enterprise-grade data handling.

## 🛠 Usage Guide

### 1. Login
Access the platform using the demo credentials provided on the login screen:
*   **User**: `admin@tradeum.com`
*   **Password**: `admin123`

### 2. Dashboard & AI Support
*   **Overview**: View your shop's health, including total products, pending items, and margin alerts.
*   **Tradeus AI Chat**: Use the chat widget (bottom right or dashboard card) to ask questions about your data or get help with configurations.

### 3. Product Approval & AI Generation
Navigate to the "Products & Approval" (Produkte & Freigabe) section:
1.  **Filter**: Use the tabs to see 'Draft' (Action Required) or 'Online' products.
2.  **AI Optimization**: Click the **Generate with AI** (Magic Wand) button on any draft product.
    *   *Note*: You must provide a valid Gemini API Key in the Configuration section for this to work.
3.  **Edit/Approve**: Review the AI-generated content, make manual edits to prices if needed, and click **Approve** to sync to Shopify.

### 4. Configuration
Customize the app behavior in the "Configuration" (Einstellungen) section:
*   **AI Settings**: Enter your Google Gemini API Key here.
*   **Shopify Connection**: Input your store URL and Admin Access Token.
*   **Margin Rules**: Set a minimum margin percentage (e.g., 25%). Products below this will be flagged.
*   **Price Rounding**: Choose between exact prices, .99, or .95 endings.

## 💻 Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS (with Dark Mode support)
*   **Charts**: Recharts
*   **AI**: Google GenAI SDK (Gemini Models)
*   **Icons**: Lucide React
