// Application configuration
//
// Three environments (two servers + local):
//   Local:     npm run dev              → .env.development   → mode 'development'
//   Server 1:  npm run build             → .env.production   → mode 'production'
//   Server 2:  npm run build:staging     → .env.staging      → mode 'staging'
export const config = {
  env: {
    /** true when running locally (npm run dev); uses .env.development */
    isLocalDev: import.meta.env.DEV,
    /** true when built for production server (npm run build); uses .env.production */
    isProduction: import.meta.env.MODE === 'production',
    /** true when built for second server (npm run build:staging); uses .env.staging */
    isStaging: import.meta.env.MODE === 'staging',
    /** @deprecated use isLocalDev */
    isDev: import.meta.env.DEV,
    /** @deprecated use isProduction */
    isProd: import.meta.env.PROD,
    /** 'development' | 'production' | 'staging' */
    mode: import.meta.env.MODE as 'development' | 'production' | 'staging',
  },

  // API endpoints: from .env.development | .env.production | .env.staging per build
  api: {
    baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:5003/api',
    emailBaseUrl: import.meta.env.VITE_EMAIL_BASE_URL || 'http://localhost:3000/api',
  },

  // App settings
  app: {
    name: 'Jooper Leads',
    version: '1.0.0',
    description: 'Intelligent Email Automation Platform',
  },
  
  // Auth settings
  auth: {
    tokenKey: 'access_token',
    tokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
} as const;

export default config;

