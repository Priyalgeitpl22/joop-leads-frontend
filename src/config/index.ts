// Application configuration
export const config = {
  // API endpoints
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

