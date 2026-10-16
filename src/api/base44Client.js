import { createClient } from '@base44/sdk';

// Initialize live Base44 client targeting your active app backend
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || '6ad1c3e109a148865917c0db',
  serverUrl: import.meta.env.VITE_BASE44_APP_BASE_URL || 'https://jecaliha-builders-corporation-copy-5917c0db.base44.app'
});

export const db = base44;
export default base44;